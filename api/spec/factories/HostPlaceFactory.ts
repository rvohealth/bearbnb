import { UpdateableProperties } from '@rvohealth/dream'
import HostPlace from '../../src/app/models/HostPlace'
import createHost from './HostFactory'
import createPlace from './PlaceFactory'

export default async function createHostPlace(attrs: UpdateableProperties<HostPlace> = {}) {
  attrs.host ||= await createHost()
  attrs.place ||= await createPlace()
  return await HostPlace.create(attrs)
}
