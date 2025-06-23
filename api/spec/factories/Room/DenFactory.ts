import { UpdateableProperties } from '@rvoh/dream'
import Den from '../../../src/app/models/Room/Den.js'
import createPlace from '../PlaceFactory.js'

export default async function createRoomDen(attrs: UpdateableProperties<Den> = {}) {
  return await Den.create({
    place: attrs.place ? null : await createPlace(),
    ...attrs,
  })
}
