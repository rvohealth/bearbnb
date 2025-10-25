import Bathroom from '@models/Room/Bathroom.js'
import { ObjectSerializer } from '@rvoh/dream'
import {
  RoomForGuestsSerializer,
  RoomSerializer,
  RoomSummarySerializer,
} from '@serializers/RoomSerializer.js'
import { BathOrShowerStylesEnum, BathOrShowerStylesEnumValues, LocalesEnum } from '@src/types/db.js'
import i18n from '@src/utils/i18n.js'

export const RoomBathroomSummarySerializer = (roomBathroom: Bathroom) =>
  RoomSummarySerializer(Bathroom, roomBathroom)

export const RoomBathroomSerializer = (roomBathroom: Bathroom) =>
  RoomSerializer(Bathroom, roomBathroom).attribute('bathOrShowerStyle')

export const BathOrShowerStyleSerializer = (
  bathOrShowerStyle: BathOrShowerStylesEnum,
  passthrough: { locale: LocalesEnum },
) =>
  ObjectSerializer({ bathOrShowerStyle }, passthrough)
    .attribute('bathOrShowerStyle', {
      as: 'value',
      openapi: { type: 'string', enum: BathOrShowerStylesEnumValues },
    })
    .customAttribute(
      'label',
      () => i18n(passthrough.locale, `rooms.Bathroom.bathOrShowerStyles.${bathOrShowerStyle}`),
      {
        openapi: 'string',
      },
    )

export const RoomBathroomForGuestsSerializer = (
  roomBathroom: Bathroom,
  passthrough: { locale: LocalesEnum },
) =>
  RoomForGuestsSerializer(Bathroom, roomBathroom, passthrough).rendersOne('bathOrShowerStyle', {
    serializer: BathOrShowerStyleSerializer,
  })
