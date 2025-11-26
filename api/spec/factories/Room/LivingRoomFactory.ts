import { UpdateableProperties } from '@rvoh/dream/types'
import RoomLivingRoom from '@models/Room/LivingRoom.js'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<RoomLivingRoom> = {}) {
  return await RoomLivingRoom.create({
    ...attrs,
  })
}
