import { UpdateableProperties } from '@rvoh/dream'
import Bedroom from '../../../src/app/models/Room/Bedroom.js'
import createPlace from '../PlaceFactory.js'

export default async function createRoomBedroom(attrs: UpdateableProperties<Bedroom> = {}) {
  return await Bedroom.create({
    place: attrs.place ? null : await createPlace(),
    bedTypes: ['twin'],
    ...attrs,
  })
}
