import Bedroom from '@models/Room/Bedroom.js'
import { UpdateableProperties } from '@rvoh/dream'
import createPlace from '@spec/factories/PlaceFactory.js'

export default async function createRoomBedroom(attrs: UpdateableProperties<Bedroom> = {}) {
  return await Bedroom.create({
    place: attrs.place ? null : await createPlace(),
    bedTypes: ['twin'],
    ...attrs,
  })
}
