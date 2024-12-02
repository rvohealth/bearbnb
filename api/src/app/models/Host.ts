import { AfterCreate, DreamColumn, DreamSerializers } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import HostPlace from './HostPlace'
import LocalizedText from './LocalizedText'
import Place from './Place'
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

  @Host.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId' })
  public localizedTexts: LocalizedText[]

  @AfterCreate()
  public async createDefaultLocalizedText(this: Host) {
    await this.createAssociation('localizedTexts', { locale: 'en-US' })
  }
}
