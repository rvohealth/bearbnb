import { UpdateableProperties } from '@rvoh/dream'
import Room from '../../src/app/models/Room.js'
import createPlace from './PlaceFactory.js'

let counter = 0

export default async function createRoom(attrs: UpdateableProperties<Room> = {}) {
  attrs.place ??= await createPlace()
  attrs.type ??= 'Bathroom'
  return await Room.create(attrs)
}
