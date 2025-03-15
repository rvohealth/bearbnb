import { Decorators, DreamColumn, DreamSerializers } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel.js'
import User from './User.js'

const Deco = new Decorators<InstanceType<typeof Guest>>()

export default class Guest extends ApplicationModel {
  public get table() {
    return 'guests' as const
  }

  public get serializers(): DreamSerializers<Guest> {
    return {
      default: 'GuestSerializer',
      summary: 'GuestSummarySerializer',
    }
  }

  public id: DreamColumn<Guest, 'id'>
  public createdAt: DreamColumn<Guest, 'createdAt'>
  public updatedAt: DreamColumn<Guest, 'updatedAt'>

  @Deco.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Guest, 'userId'>
}
