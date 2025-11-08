import LivingRoom from '@models/Room/LivingRoom.js'
import { RoomSerializer, RoomSummarySerializer } from '@serializers/RoomSerializer.js'

export const RoomLivingRoomSummarySerializer = (roomLivingRoom: LivingRoom) =>
  RoomSummarySerializer(LivingRoom, roomLivingRoom)

export const RoomLivingRoomSerializer = (roomLivingRoom: LivingRoom) =>
  RoomSerializer(LivingRoom, roomLivingRoom)
