import { RoomSerializer, RoomSummarySerializer } from '../RoomSerializer.js'
import RoomBathroom from '../../models/Room/Bathroom.js'

export const RoomBathroomSummarySerializer = (roomBathroom: RoomBathroom) =>
  RoomSummarySerializer(RoomBathroom, roomBathroom)

export const RoomBathroomSerializer = (roomBathroom: RoomBathroom) =>
  RoomSerializer(RoomBathroom, roomBathroom)
    .attribute('bathOrShowerType')
