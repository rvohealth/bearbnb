import { UpdateableProperties } from '@rvoh/dream'
import LivingRoom from '../../../src/app/models/Room/LivingRoom.js'
import createPlace from '../PlaceFactory.js'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<LivingRoom> = {}) {
  attrs.place ??= await createPlace()
  return await LivingRoom.create(attrs)
}
