import { DreamColumn, DreamSerializers } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import Stay from './Stay'
import User from './User'

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

  @Guest.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Guest, 'userId'>

  @Guest.HasMany('Stay')
  public stays: Stay[]
}
