import { UpdateableProperties } from '@rvohealth/dream'
import Bedroom from '../../../src/app/models/Room/Bedroom'
import createPlace from '../PlaceFactory'

export default async function createRoomBedroom(attrs: UpdateableProperties<Bedroom> = {}) {
  attrs.place ||= await createPlace()
  attrs.bedTypes ||= ['twin']
  return await Bedroom.create(attrs)
}
