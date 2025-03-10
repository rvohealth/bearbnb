import { UpdateableProperties } from '@rvohealth/dream'
import LivingRoom from '../../../src/app/models/Room/LivingRoom'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<LivingRoom> = {}) {
  return await LivingRoom.create(attrs)
}
