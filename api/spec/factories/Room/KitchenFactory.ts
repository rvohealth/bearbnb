import { UpdateableProperties } from '@rvoh/dream'
import RoomKitchen from '../../../src/app/models/Room/Kitchen.js'

export default async function createRoomKitchen(attrs: UpdateableProperties<RoomKitchen> = {}) {
  return await RoomKitchen.create({
    appliances: 'stove',
    ...attrs,
  })
}
