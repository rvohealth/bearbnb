import { UpdateableProperties } from '@rvoh/dream'
import HostPlace from '../../src/app/models/HostPlace.js'
import createHost from './HostFactory.js'
import createPlace from './PlaceFactory.js'

export default async function createHostPlace(attrs: UpdateableProperties<HostPlace> = {}) {
  return await HostPlace.create({
    host: attrs.host ? null : await createHost(),
    place: attrs.place ? null : await createPlace(),
    ...attrs,
  })
}
