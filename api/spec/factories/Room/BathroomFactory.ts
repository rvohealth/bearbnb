import { UpdateableProperties } from '@rvoh/dream/types'
import RoomBathroom from '@models/Room/Bathroom.js'

export default async function createRoomBathroom(attrs: UpdateableProperties<RoomBathroom> = {}) {
  return await RoomBathroom.create({
    bathOrShowerStyle: 'bath',
    ...attrs,
  })
}
