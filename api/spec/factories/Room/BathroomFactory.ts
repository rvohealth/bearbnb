import { UpdateableProperties } from '@rvohealth/dream'
import Bathroom from '../../../src/app/models/Room/Bathroom'

export default async function createRoomBathroom(attrs: UpdateableProperties<Bathroom> = {}) {
  return await Bathroom.create(attrs)
}
