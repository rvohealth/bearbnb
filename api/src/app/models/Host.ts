import ApplicationModel from '@models/ApplicationModel.js'
import HostPlace from '@models/HostPlace.js'
import LocalizedText from '@models/LocalizedText.js'
import Place from '@models/Place.js'
import User from '@models/User.js'
import { Decorators, DreamColumn, DreamSerializers } from '@rvoh/dream'

const deco = new Decorators<typeof Host>()

export default class Host extends ApplicationModel {
  public override get table() {
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

  @deco.BelongsTo('User', { on: 'userId' })
  public user: User
  public userId: DreamColumn<Host, 'userId'>

  @deco.HasMany('HostPlace')
  public hostPlaces: HostPlace[]

  @deco.HasMany('Place', { through: 'hostPlaces' })
  public places: Place[]

  @deco.HasMany('LocalizedText', { polymorphic: true, on: 'localizableId' })
  public localizedTexts: LocalizedText[]

  @deco.AfterCreate()
  public async createDefaultLocalizedText(this: Host) {
    await this.createAssociation('localizedTexts', { locale: 'en-US' })
  }
}
