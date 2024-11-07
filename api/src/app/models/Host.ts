import { AfterCreate, DreamColumn, DreamConst, DreamSerializers } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import HostPlace from './HostPlace'
import LocalizedText from './LocalizedText'
import Place from './Place'
import RoomBase from './Room/Base'
import User from './User'

export default class Host extends ApplicationModel {
  public get table() {
    return 'hosts' as const
  }

  public get serializers(): DreamSerializers<Host> {
    return {
      default: 'HostSerializer',
      summary: 'HostSummarySerializer',
    }
  }

  public id: DreamColumn<Host, 'id'>
  public createdAt: DreamColumn<Host, 'createdAt'>
  public updatedAt: DreamColumn<Host, 'updatedAt'>

  @Host.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Host, 'userId'>

  @Host.HasMany('HostPlace')
  public hostPlaces: HostPlace[]

  @Host.HasMany('Place', { through: 'hostPlaces' })
  public places: Place[]

  @Host.HasMany('Room/Base', { through: 'places' })
  public rooms: RoomBase[]

  @Host.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId', dependent: 'destroy' })
  public localizedTexts: LocalizedText[]

  @Place.HasOne('LocalizedText', {
    polymorphic: true,
    foreignKey: 'localizableId',
    where: { locale: DreamConst.required },
  })
  public currentLocalizedText: LocalizedText

  @AfterCreate()
  private async createDefaultLocalizedText(this: Host) {
    const localizedText = await LocalizedText.create({ localizable: this, title: 'About your host' })
    this.localizedTexts = [localizedText]
  }
}
