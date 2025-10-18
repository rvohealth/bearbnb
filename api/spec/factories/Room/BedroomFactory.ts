import Bedroom from '@models/Room/Bedroom.js'
import { UpdateableProperties } from '@rvoh/dream'

export default async function createRoomBedroom(attrs: UpdateableProperties<Bedroom> = {}) {
  return await Bedroom.create({
    bedTypes: ['twin'],
    ...attrs,
  })
}
