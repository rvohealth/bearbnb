import LivingRoom from '@models/Room/LivingRoom.js'
import { UpdateableProperties } from '@rvoh/dream/types'
import createPlace from '@spec/factories/PlaceFactory.js'

export default async function createRoomLivingRoom(attrs: UpdateableProperties<LivingRoom> = {}) {
  return await LivingRoom.create({
    place: attrs.place ? null : await createPlace(),
    ...attrs,
  })
}
