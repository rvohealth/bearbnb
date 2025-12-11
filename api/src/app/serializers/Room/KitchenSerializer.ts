import Kitchen from '@models/Room/Kitchen.js'
import { ObjectSerializer } from '@rvoh/dream'
import { RoomForGuestsSerializer, RoomSerializer, RoomSummarySerializer } from '@serializers/RoomSerializer.js'
import { ApplianceTypesEnum, ApplianceTypesEnumValues, LocalesEnum } from '@src/types/db.js'
import i18n from '@src/utils/i18n.js'

export const RoomKitchenSummarySerializer = (roomKitchen: Kitchen) =>
  RoomSummarySerializer(Kitchen, roomKitchen)

export const RoomKitchenSerializer = (roomKitchen: Kitchen) =>
  RoomSerializer(Kitchen, roomKitchen)
    .attribute('appliances')

export const ApplianceSerializer = (appliance: ApplianceTypesEnum, passthrough: { locale: LocalesEnum }) =>
  ObjectSerializer({ appliance }, passthrough)
    .attribute('appliance', { as: 'value', openapi: { type: 'string', enum: ApplianceTypesEnumValues } })
    .customAttribute('label', () => i18n(passthrough.locale, `rooms.Kitchen.appliances.${appliance}`), {
      openapi: 'string',
    })

export const RoomKitchenForGuestsSerializer = (roomKitchen: Kitchen, passthrough: { locale: LocalesEnum }) =>
  RoomForGuestsSerializer(Kitchen, roomKitchen, passthrough).rendersMany('appliances', {
    serializer: ApplianceSerializer,
  })
