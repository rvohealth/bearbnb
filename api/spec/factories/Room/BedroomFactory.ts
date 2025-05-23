import { UpdateableProperties } from '@rvoh/dream'
import Bedroom from '../../../src/app/models/Room/Bedroom.js'
import createPlace from '../PlaceFactory.js'

export default async function createRoomBedroom(attrs: UpdateableProperties<Bedroom> = {}) {
  attrs.place ??= await createPlace()
  attrs.bedTypes ??= ['twin']
  return await Bedroom.create(attrs)
}
