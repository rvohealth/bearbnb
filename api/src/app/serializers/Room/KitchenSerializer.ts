import Kitchen from '@models/Room/Kitchen.js'
import { RoomSerializer, RoomSummarySerializer } from '@serializers/RoomSerializer.js'

export const RoomKitchenSummarySerializer = (roomKitchen: Kitchen) =>
  RoomSummarySerializer(Kitchen, roomKitchen)

export const RoomKitchenSerializer = (roomKitchen: Kitchen) =>
  RoomSerializer(Kitchen, roomKitchen)
    .attribute('appliances')
