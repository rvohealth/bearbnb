import { UpdateableProperties } from '@rvohealth/dream'
import LivingRoom from '../../../src/app/models/Room/LivingRoom'
import createPlace from '../PlaceFactory'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<LivingRoom> = {}) {
  attrs.place ||= await createPlace()
  return await LivingRoom.create(attrs)
}
