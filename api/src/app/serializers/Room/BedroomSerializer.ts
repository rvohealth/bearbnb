import { ApplianceTypesEnumValues, LocalesEnum } from '../../../types/db.js'
import i18n from '../../../utils/i18n.js'
import Bedroom from '../../models/Room/Bedroom.js'
import { RoomForGuestsSerializer, RoomSerializer, RoomSummarySerializer } from '../RoomSerializer.js'

export const RoomBedroomSummarySerializer = (roomBedroom: Bedroom) =>
  RoomSummarySerializer(Bedroom, roomBedroom)

export const RoomBedroomSerializer = (roomBedroom: Bedroom) =>
  RoomSerializer(Bedroom, roomBedroom).attribute('bedTypes')

export const RoomBedroomForGuestsSerializer = (roomBedroom: Bedroom, passthrough: { locale: LocalesEnum }) =>
  RoomForGuestsSerializer(Bedroom, roomBedroom, passthrough)
    .attribute('bedTypes')
    .customAttribute(
      'bedTypes',

      () =>
        roomBedroom.bedTypes.map(bedType => ({
          value: bedType,
          label: i18n(passthrough.locale, `rooms.Bedroom.bedTypes.${bedType}`),
        })),

      {
        openapi: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              value: {
                type: 'string',
                enum: ApplianceTypesEnumValues,
              },
              label: 'string',
            },
          },
        },
      },
    )
