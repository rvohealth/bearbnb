import { UpdateableProperties } from '@rvoh/dream'
import Den from '../../../src/app/models/Room/Den'
import createPlace from '../PlaceFactory'

export default async function createRoomDen(attrs: UpdateableProperties<Den> = {}) {
  attrs.place ||= await createPlace()
  return await Den.create(attrs)
}
