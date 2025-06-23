import { Decorators, DreamColumn, DreamSerializers } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel.js'
import User from './User.js'

const deco = new Decorators<typeof Guest>()

export default class Guest extends ApplicationModel {
  public override get table() {
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

  @deco.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Guest, 'userId'>
}
