import { UpdateableProperties } from '@rvohealth/dream'
import RoomKitchen from '../../../src/app/models/Room/Kitchen'

let counter = 0

export default async function createRoomKitchen(attrs: UpdateableProperties<RoomKitchen> = {}) {
  attrs.appliances ||= 'stove'
  return await RoomKitchen.create(attrs)
}
