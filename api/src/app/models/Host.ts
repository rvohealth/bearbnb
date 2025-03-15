import { Decorators, DreamColumn, DreamSerializers } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel.js'
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
}
