import { Decorators, DreamColumn, DreamSerializers } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel.js'
import Place from './Place.js'

const Deco = new Decorators<InstanceType<typeof Room>>()

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

  @Deco.BelongsTo('Place')
  public place: Place
  public placeId: DreamColumn<Room, 'placeId'>
}
