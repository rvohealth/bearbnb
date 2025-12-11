import Den from '@models/Room/Den.js'
import { UpdateableProperties } from '@rvoh/dream/types'
import createPlace from '../PlaceFactory.js'

export default async function createRoomDen(attrs: UpdateableProperties<Den> = {}) {
  return await Den.create({
    place: attrs.place ? null : await createPlace(),
    ...attrs,
  })
}
