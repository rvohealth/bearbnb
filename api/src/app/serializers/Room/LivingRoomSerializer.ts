import LivingRoom from '@models/Room/LivingRoom.js'
import { RoomForGuestsSerializer, RoomSerializer, RoomSummarySerializer } from '@serializers/RoomSerializer.js'
import { LocalesEnum } from '@src/types/db.js'

export const RoomLivingRoomSummarySerializer = (roomLivingRoom: LivingRoom) =>
  RoomSummarySerializer(LivingRoom, roomLivingRoom)

export const RoomLivingRoomSerializer = (roomLivingRoom: LivingRoom) =>
  RoomSerializer(LivingRoom, roomLivingRoom)

export const RoomLivingRoomForGuestsSerializer = (
  roomLivingRoom: LivingRoom,
  passthrough: { locale: LocalesEnum },
) => RoomForGuestsSerializer(LivingRoom, roomLivingRoom, passthrough)
