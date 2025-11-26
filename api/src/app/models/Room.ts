import ApplicationModel from '@models/ApplicationModel.js'
import Place from '@models/Place.js'
import { Decorators } from '@rvoh/dream'
import { DreamColumn } from '@rvoh/dream/types'

const deco = new Decorators<typeof Room>()

export default class Room extends ApplicationModel {
  public override get table() {
    return 'rooms' as const
  }

  public id: DreamColumn<Room, 'id'>
  public type: DreamColumn<Room, 'type'>
  public position: DreamColumn<Room, 'position'>
  public deletedAt: DreamColumn<Room, 'deletedAt'>
  public createdAt: DreamColumn<Room, 'createdAt'>
  public updatedAt: DreamColumn<Room, 'updatedAt'>

  @deco.BelongsTo('Place', { on: 'placeId' })
  public place: Place
  public placeId: DreamColumn<Room, 'placeId'>
}
