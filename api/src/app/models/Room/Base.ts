import { DreamColumn, DreamSerializers } from '@rvohealth/dream'
import ApplicationModel from '../ApplicationModel'
import Place from '../Place'

export default class RoomBase extends ApplicationModel {
  public get table() {
    return 'rooms' as const
  }

  public get serializers(): DreamSerializers<RoomBase> {
    return {
      default: 'Room/BaseSerializer',
      summary: 'Room/BaseSummarySerializer',
    }
  }

  public id: DreamColumn<RoomBase, 'id'>
  public type: DreamColumn<RoomBase, 'type'>
  public position: DreamColumn<RoomBase, 'position'>
  public deletedAt: DreamColumn<RoomBase, 'deletedAt'>
  public createdAt: DreamColumn<RoomBase, 'createdAt'>
  public updatedAt: DreamColumn<RoomBase, 'updatedAt'>

  @RoomBase.BelongsTo('Place')
  public place: Place
  public placeId: DreamColumn<RoomBase, 'placeId'>
}
