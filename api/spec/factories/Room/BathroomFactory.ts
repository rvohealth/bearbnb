import Bathroom from '@models/Room/Bathroom.js'
import { UpdateableProperties } from '@rvoh/dream/types'
import createPlace from '../PlaceFactory.js'

export default async function createRoomBathroom(attrs: UpdateableProperties<Bathroom> = {}) {
  return await Bathroom.create({
    place: attrs.place ? null : await createPlace(),
    bathOrShowerStyle: 'bath',
    ...attrs,
  })
}
