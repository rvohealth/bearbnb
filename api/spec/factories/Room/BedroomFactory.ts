import { UpdateableProperties } from '@rvoh/dream/types'
import RoomBedroom from '@models/Room/Bedroom.js'

export default async function createRoomBedroom(attrs: UpdateableProperties<RoomBedroom> = {}) {
  return await RoomBedroom.create({
    bedTypes: ['twin'],
    ...attrs,
  })
}
