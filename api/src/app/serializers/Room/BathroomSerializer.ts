import Bathroom from '@models/Room/Bathroom.js'
import { RoomSerializer, RoomSummarySerializer } from '@serializers/RoomSerializer.js'

export const RoomBathroomSummarySerializer = (roomBathroom: Bathroom) =>
  RoomSummarySerializer(Bathroom, roomBathroom)

export const RoomBathroomSerializer = (roomBathroom: Bathroom) =>
  RoomSerializer(Bathroom, roomBathroom)
    .attribute('bathOrShowerStyle')
