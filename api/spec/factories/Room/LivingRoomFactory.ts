import LivingRoom from '@models/Room/LivingRoom.js'
import { UpdateableProperties } from '@rvoh/dream/types'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<LivingRoom> = {}) {
  return await LivingRoom.create({
    ...attrs,
  })
}
