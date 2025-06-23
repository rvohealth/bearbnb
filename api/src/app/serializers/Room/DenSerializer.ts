import { RoomSerializer, RoomSummarySerializer } from '../RoomSerializer.js'
import RoomDen from '../../models/Room/Den.js'

export const RoomDenSummarySerializer = (roomDen: RoomDen) =>
  RoomSummarySerializer(RoomDen, roomDen)

export const RoomDenSerializer = (roomDen: RoomDen) =>
  RoomSerializer(RoomDen, roomDen)
