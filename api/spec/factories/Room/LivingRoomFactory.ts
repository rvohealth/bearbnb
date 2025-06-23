import { UpdateableProperties } from '@rvoh/dream'
import LivingRoom from '../../../src/app/models/Room/LivingRoom.js'
import createPlace from '../PlaceFactory.js'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<LivingRoom> = {}) {
  return await LivingRoom.create({
    place: attrs.place ? null : await createPlace(),
    ...attrs,
  })
}
