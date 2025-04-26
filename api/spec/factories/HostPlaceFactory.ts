import { UpdateableProperties } from '@rvoh/dream'
import HostPlace from '../../src/app/models/HostPlace.js'
import createHost from './HostFactory.js'
import createPlace from './PlaceFactory.js'

export default async function createHostPlace(attrs: UpdateableProperties<HostPlace> = {}) {
  attrs.host ??= await createHost()
  attrs.place ??= await createPlace()
  return await HostPlace.create(attrs)
}
