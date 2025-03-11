import { UpdateableProperties } from '@rvoh/dream'
import Room from '../../src/app/models/Room'
import createPlace from './PlaceFactory'

let counter = 0

export default async function createRoom(attrs: UpdateableProperties<Room> = {}) {
  attrs.place ||= await createPlace()
  attrs.type ||= 'Bathroom'
  return await Room.create(attrs)
}
