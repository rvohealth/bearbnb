import { RoomSerializer, RoomSummarySerializer } from '@serializers/RoomSerializer.js'
import RoomLivingRoom from '@models/Room/LivingRoom.js'

export const RoomLivingRoomSummarySerializer = (roomLivingRoom: RoomLivingRoom) =>
  RoomSummarySerializer(RoomLivingRoom, roomLivingRoom)

export const RoomLivingRoomSerializer = (roomLivingRoom: RoomLivingRoom) =>
  RoomSerializer(RoomLivingRoom, roomLivingRoom)
