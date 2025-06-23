import { DreamSerializer } from '@rvoh/dream'
import Room from '../models/Room.js'

export const RoomSummarySerializer = <T extends Room>(StiChildClass: typeof Room, room: T) =>
  DreamSerializer(StiChildClass ?? Room, room)
    .attribute('id')
    .attribute('type')

export const RoomSerializer = <T extends Room>(StiChildClass: typeof Room, room: T) =>
  RoomSummarySerializer(StiChildClass, room).attribute('position').attribute('deletedAt')
