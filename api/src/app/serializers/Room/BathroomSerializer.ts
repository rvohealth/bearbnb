import { LocalesEnum } from '../../../types/db.js'
import i18n from '../../../utils/i18n.js'
import Bathroom from '../../models/Room/Bathroom.js'
import { RoomForGuestsSerializer, RoomSerializer, RoomSummarySerializer } from '../RoomSerializer.js'

export const RoomBathroomSummarySerializer = (roomBathroom: Bathroom) =>
  RoomSummarySerializer(Bathroom, roomBathroom)

export const RoomBathroomSerializer = (roomBathroom: Bathroom) =>
  RoomSerializer(Bathroom, roomBathroom).attribute('bathOrShowerType')

export const RoomBathroomForGuestsSerializer = (
  roomBathroom: Bathroom,
  passthrough: { locale: LocalesEnum },
) =>
  RoomForGuestsSerializer(Bathroom, roomBathroom, passthrough).customAttribute(
    'bathOrShowerType',
    () => i18n(passthrough.locale, `rooms.Bathroom.bathOrShowerTypes.${roomBathroom.bathOrShowerType!}`),
    {
      openapi: 'string',
    },
  )
