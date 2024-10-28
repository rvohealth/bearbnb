import { UpdateableProperties } from '@rvohealth/dream'
import Bathroom from '../../../src/app/models/Room/Bathroom'
import createPlace from '../PlaceFactory'

export default async function createRoomBathroom(attrs: UpdateableProperties<Bathroom> = {}) {
  attrs.place ||= await createPlace()
  attrs.bathOrShowerType ||= 'bath'
  return await Bathroom.create(attrs)
}
