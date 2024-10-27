import { UpdateableProperties } from '@rvohealth/dream'
import Stay from '../../src/app/models/Stay'
import createGuest from './GuestFactory'
import createPlace from './PlaceFactory'

export default async function createStay(attrs: UpdateableProperties<Stay> = {}) {
  attrs.guest ||= await createGuest()
  attrs.place ||= await createPlace()
  return await Stay.create(attrs)
}
