import { RoomSerializer, RoomSummarySerializer } from '@serializers/RoomSerializer.js'
import RoomKitchen from '@models/Room/Kitchen.js'

export const RoomKitchenSummarySerializer = (roomKitchen: RoomKitchen) =>
  RoomSummarySerializer(RoomKitchen, roomKitchen)

export const RoomKitchenSerializer = (roomKitchen: RoomKitchen) =>
  RoomSerializer(RoomKitchen, roomKitchen)
    .attribute('appliances')
