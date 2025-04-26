import { UpdateableProperties } from '@rvoh/dream'
import RoomBathroom from '../../../src/app/models/Room/Bathroom.js'

export default async function createRoomBathroom(attrs: UpdateableProperties<RoomBathroom> = {}) {
  return await RoomBathroom.create(attrs)
}
