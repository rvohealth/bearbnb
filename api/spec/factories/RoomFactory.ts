import { UpdateableProperties } from '@rvoh/dream/types'
import Room from '@models/Room.js'
import createPlace from '@spec/factories/PlaceFactory.js'

export default async function createRoom(attrs: UpdateableProperties<Room> = {}) {
  return await Room.create({
    place: attrs.place ? null : await createPlace(),
    type: 'Bathroom',
    ...attrs,
  })
}
