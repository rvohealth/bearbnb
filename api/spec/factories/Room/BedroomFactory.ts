import { UpdateableProperties } from '@rvohealth/dream'
import RoomBedroom from '../../../src/app/models/Room/Bedroom'

let counter = 0

export default async function createRoomBedroom(attrs: UpdateableProperties<RoomBedroom> = {}) {
  attrs.bedTypes ||= 'twin'
  return await RoomBedroom.create(attrs)
}
