import { RoomSerializer, RoomSummarySerializer } from '@serializers/RoomSerializer.js'
import RoomBedroom from '@models/Room/Bedroom.js'

export const RoomBedroomSummarySerializer = (roomBedroom: RoomBedroom) =>
  RoomSummarySerializer(RoomBedroom, roomBedroom)

export const RoomBedroomSerializer = (roomBedroom: RoomBedroom) =>
  RoomSerializer(RoomBedroom, roomBedroom)
    .attribute('bedTypes')
