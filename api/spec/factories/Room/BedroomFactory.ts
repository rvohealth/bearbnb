import { UpdateableProperties } from '@rvohealth/dream'
import Bedroom from '../../../src/app/models/Room/Bedroom'
import createPlace from '../PlaceFactory'

export default async function createRoomBedroom(attrs: UpdateableProperties<Bedroom> = {}) {
  attrs.bedTypes ||= ['twin']
  attrs.place ||= await createPlace()
  return await Bedroom.create(attrs)
}
