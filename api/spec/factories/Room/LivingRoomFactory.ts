import { UpdateableProperties } from '@rvoh/dream'
import RoomLivingRoom from '../../../src/app/models/Room/LivingRoom.js'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<RoomLivingRoom> = {}) {
  return await RoomLivingRoom.create({
    ...attrs,
  })
}
