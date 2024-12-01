import { DreamColumn, DreamSerializers } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import Place from './Place'

export default class Room extends ApplicationModel {
  public get table() {
    return 'rooms' as const
  }

  public get serializers(): DreamSerializers<Room> {
    return {
      default: 'RoomSerializer',
      summary: 'RoomSummarySerializer',
    }
  }

  public id: DreamColumn<Room, 'id'>
  public type: DreamColumn<Room, 'type'>
  public position: DreamColumn<Room, 'position'>
  public deletedAt: DreamColumn<Room, 'deletedAt'>
  public createdAt: DreamColumn<Room, 'createdAt'>
  public updatedAt: DreamColumn<Room, 'updatedAt'>

  @Room.BelongsTo('Place')
  public place: Place
  public placeId: DreamColumn<Room, 'placeId'>
}
