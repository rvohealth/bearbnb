import { UpdateableProperties } from '@rvoh/dream'
import Bathroom from '../../../src/app/models/Room/Bathroom'
import createPlace from '../PlaceFactory'

export default async function createRoomBathroom(attrs: UpdateableProperties<Bathroom> = {}) {
  attrs.place ||= await createPlace()
  return await Bathroom.create(attrs)
}
