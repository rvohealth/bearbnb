import { UpdateableProperties } from '@rvoh/dream'
import Room from '../../src/app/models/Room.js'
import createPlace from './PlaceFactory.js'

export default async function createRoom(attrs: UpdateableProperties<Room> = {}) {
  return await Room.create({
    place: attrs.place ? null : await createPlace(),
    type: 'Bathroom',
    ...attrs,
  })
}
