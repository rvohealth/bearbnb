import { UpdateableProperties } from '@rvohealth/dream'
import RoomBathroom from '../../../src/app/models/Room/Bathroom'

let counter = 0

export default async function createRoomBathroom(attrs: UpdateableProperties<RoomBathroom> = {}) {
  attrs.bathOrShowerType ||= 'bath'
  return await RoomBathroom.create(attrs)
}
