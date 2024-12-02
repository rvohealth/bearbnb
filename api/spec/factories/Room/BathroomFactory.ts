import { UpdateableProperties } from '@rvohealth/dream'
import Bathroom from '../../../src/app/models/Room/Bathroom'
import createPlace from '../PlaceFactory'

export default async function createRoomBathroom(attrs: UpdateableProperties<Bathroom> = {}) {
  attrs.bathOrShowerType ||= 'bath'
  attrs.place ||= await createPlace()
  return await Bathroom.create(attrs)
}
