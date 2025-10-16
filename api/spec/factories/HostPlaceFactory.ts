import { UpdateableProperties } from '@rvoh/dream'
import HostPlace from '@models/HostPlace.js'
import createHost from '@spec/factories/HostFactory.js'
import createPlace from '@spec/factories/PlaceFactory.js'

export default async function createHostPlace(attrs: UpdateableProperties<HostPlace> = {}) {
  return await HostPlace.create({
    host: attrs.host ? null : await createHost(),
    place: attrs.place ? null : await createPlace(),
    ...attrs,
  })
}
