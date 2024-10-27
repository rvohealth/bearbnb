import { UpdateableProperties } from '@rvohealth/dream'
import RoomBase from '../../../src/app/models/Room/Base'
import createPlace from '../PlaceFactory'

let counter = 0

export default async function createRoomBase(attrs: UpdateableProperties<RoomBase> = {}) {
  attrs.place ||= await createPlace()
  attrs.type ||= 'Bathroom'
  return await RoomBase.create(attrs)
}
