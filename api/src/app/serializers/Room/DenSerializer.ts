import { LocalesEnum } from '../../../types/db.js'
import Den from '../../models/Room/Den.js'
import { RoomForGuestsSerializer, RoomSerializer, RoomSummarySerializer } from '../RoomSerializer.js'

export const RoomDenSummarySerializer = (roomDen: Den) => RoomSummarySerializer(Den, roomDen)

export const RoomDenSerializer = (roomDen: Den) => RoomSerializer(Den, roomDen)

export const RoomDenForGuestsSerializer = (roomDen: Den, passthrough: { locale: LocalesEnum }) =>
  RoomForGuestsSerializer(Den, roomDen, passthrough)
