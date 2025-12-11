import Bedroom from '@models/Room/Bedroom.js'
import { RoomSerializer, RoomSummarySerializer } from '@serializers/RoomSerializer.js'

export const RoomBedroomSummarySerializer = (roomBedroom: Bedroom) =>
  RoomSummarySerializer(Bedroom, roomBedroom)

export const RoomBedroomSerializer = (roomBedroom: Bedroom) =>
  RoomSerializer(Bedroom, roomBedroom)
    .attribute('bedTypes')
