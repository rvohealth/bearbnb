import { Decorators, DreamColumn, DreamSerializers } from '@rvoh/dream'
import ApplicationModel from '@models/ApplicationModel.js'
import User from '@models/User.js'

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
}
