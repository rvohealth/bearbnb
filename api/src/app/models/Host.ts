import { Decorators, DreamColumn, DreamSerializers } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import HostPlace from './HostPlace'
import Place from './Place'
import User from './User'

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
}
