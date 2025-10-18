import LivingRoom from '@models/Room/LivingRoom.js'
import { UpdateableProperties } from '@rvoh/dream'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<LivingRoom> = {}) {
  return await LivingRoom.create({
    ...attrs,
  })
}
