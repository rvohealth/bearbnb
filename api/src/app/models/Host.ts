import { Decorators, DreamColumn, DreamSerializers } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel.js'
import HostPlace from './HostPlace.js'
import LocalizedText from './LocalizedText.js'
import Place from './Place.js'
import User from './User.js'

const Deco = new Decorators<InstanceType<typeof Host>>()

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

  @Deco.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Host, 'userId'>

  @Deco.HasMany('HostPlace')
  public hostPlaces: HostPlace[]

  @Deco.HasMany('Place', { through: 'hostPlaces' })
  public places: Place[]

  @Deco.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId' })
  public localizedTexts: LocalizedText[]

  @Deco.AfterCreate()
  public async createDefaultLocalizedText(this: Host) {
    await this.createAssociation('localizedTexts', { locale: 'en-US' })
  }
}
