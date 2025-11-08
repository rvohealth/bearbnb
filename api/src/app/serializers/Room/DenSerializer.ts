import Den from '@models/Room/Den.js'
import {
  RoomForGuestsSerializer,
  RoomSerializer,
  RoomSummarySerializer,
} from '@serializers/RoomSerializer.js'
import { LocalesEnum } from '@src/types/db.js'

export const RoomDenSummarySerializer = (roomDen: Den) => RoomSummarySerializer(Den, roomDen)

export const RoomDenSerializer = (roomDen: Den) => RoomSerializer(Den, roomDen)

export const RoomDenForGuestsSerializer = (roomDen: Den, passthrough: { locale: LocalesEnum }) =>
  RoomForGuestsSerializer(Den, roomDen, passthrough)
