import { UpdateableProperties } from '@rvohealth/dream'
import RoomBathroom from '../../../src/app/models/Room/Bathroom'

export default async function createRoomBathroom(attrs: UpdateableProperties<RoomBathroom> = {}) {
  return await RoomBathroom.create(attrs)
}
