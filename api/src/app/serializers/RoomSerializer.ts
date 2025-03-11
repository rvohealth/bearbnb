import { Attribute, DreamColumn, DreamSerializer } from '@rvoh/dream'
import Room from '../models/Room'

export class RoomSummarySerializer<DataType extends Room, Passthrough extends object> extends DreamSerializer<
  DataType,
  Passthrough
> {
  @Attribute(Room)
  public id: DreamColumn<Room, 'id'>
}

export default class RoomSerializer<
  DataType extends Room,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {
  @Attribute(Room)
  public type: DreamColumn<Room, 'type'>

  @Attribute(Room)
  public position: DreamColumn<Room, 'position'>

  @Attribute(Room)
  public deletedAt: DreamColumn<Room, 'deletedAt'>
}
