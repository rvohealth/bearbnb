import { UpdateableProperties } from '@rvoh/dream'
import RoomBedroom from '../../../src/app/models/Room/Bedroom.js'

export default async function createRoomBedroom(attrs: UpdateableProperties<RoomBedroom> = {}) {
  return await RoomBedroom.create({
    bedTypes: 'twin',
    ...attrs,
  })
}
