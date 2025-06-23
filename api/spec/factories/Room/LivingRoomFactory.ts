import { UpdateableProperties } from '@rvoh/dream'
import LivingRoom from '../../../src/app/models/Room/LivingRoom.js'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<LivingRoom> = {}) {
  return await LivingRoom.create({
    ...attrs,
  })
}
