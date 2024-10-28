import { UpdateableProperties } from '@rvohealth/dream'
import RoomLivingRoom from '../../../src/app/models/Room/LivingRoom'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<RoomLivingRoom> = {}) {
  return await RoomLivingRoom.create(attrs)
}
