import { DreamSerializer } from '@rvoh/dream'
import Room from '../models/Room.js'

export const RoomSummarySerializer = <T extends Room>(StiChildClass: typeof Room, room: T) =>
  DreamSerializer(StiChildClass ?? Room, room)
    .attribute('id')

export const RoomSerializer = <T extends Room>(StiChildClass: typeof Room, room: T) =>
  RoomSummarySerializer(StiChildClass, room)
    .attribute('type')
    .attribute('position')
    .attribute('deletedAt')
