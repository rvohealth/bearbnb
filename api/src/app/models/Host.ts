import ApplicationModel from '@models/ApplicationModel.js'
import HostPlace from '@models/HostPlace.js'
import Place from '@models/Place.js'
import User from '@models/User.js'
import { Decorators } from '@rvoh/dream'
import { DreamColumn, DreamSerializers } from '@rvoh/dream/types'

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
}
