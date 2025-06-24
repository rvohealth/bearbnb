import { LocalesEnum } from '../../../types/db.js'
import LivingRoom from '../../models/Room/LivingRoom.js'
import { RoomForGuestsSerializer, RoomSerializer, RoomSummarySerializer } from '../RoomSerializer.js'

export const RoomLivingRoomSummarySerializer = (roomLivingRoom: LivingRoom) =>
  RoomSummarySerializer(LivingRoom, roomLivingRoom)

export const RoomLivingRoomSerializer = (roomLivingRoom: LivingRoom) =>
  RoomSerializer(LivingRoom, roomLivingRoom)

export const RoomLivingRoomForGuestsSerializer = (
  roomLivingRoom: LivingRoom,
  passthrough: { locale: LocalesEnum },
) => RoomForGuestsSerializer(LivingRoom, roomLivingRoom, passthrough)
