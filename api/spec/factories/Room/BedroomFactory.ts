import { UpdateableProperties } from '@rvoh/dream'
import Bedroom from '../../../src/app/models/Room/Bedroom.js'

export default async function createRoomBedroom(attrs: UpdateableProperties<Bedroom> = {}) {
  attrs.bedTypes ??= ['twin']
  return await Bedroom.create(attrs)
}
