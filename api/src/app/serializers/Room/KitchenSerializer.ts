import { ApplianceTypesEnumValues, LocalesEnum } from '../../../types/db.js'
import i18n from '../../../utils/i18n.js'
import Kitchen from '../../models/Room/Kitchen.js'
import { RoomForGuestsSerializer, RoomSerializer, RoomSummarySerializer } from '../RoomSerializer.js'

export const RoomKitchenSummarySerializer = (roomKitchen: Kitchen) =>
  RoomSummarySerializer(Kitchen, roomKitchen)

export const RoomKitchenSerializer = (roomKitchen: Kitchen) =>
  RoomSerializer(Kitchen, roomKitchen).attribute('appliances')

export const RoomKitchenForGuestsSerializer = (roomKitchen: Kitchen, passthrough: { locale: LocalesEnum }) =>
  RoomForGuestsSerializer(Kitchen, roomKitchen, passthrough).customAttribute(
    'appliances',

    () =>
      roomKitchen.appliances.map(appliance => ({
        value: appliance,
        label: i18n(passthrough.locale, `rooms.Kitchen.appliances.${appliance}`),
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
