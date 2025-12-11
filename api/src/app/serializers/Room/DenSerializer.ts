import Den from '@models/Room/Den.js'
import { RoomSerializer, RoomSummarySerializer } from '@serializers/RoomSerializer.js'

export const RoomDenSummarySerializer = (roomDen: Den) =>
  RoomSummarySerializer(Den, roomDen)

export const RoomDenSerializer = (roomDen: Den) =>
  RoomSerializer(Den, roomDen)
