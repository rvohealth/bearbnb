import { UpdateableProperties } from '@rvoh/dream'
import Bathroom from '../../../src/app/models/Room/Bathroom.js'
import createPlace from '../PlaceFactory.js'

export default async function createRoomBathroom(attrs: UpdateableProperties<Bathroom> = {}) {
  return await Bathroom.create({
    place: attrs.place ? null : await createPlace(),
    bathOrShowerType: 'shower',
    ...attrs,
  })
}
