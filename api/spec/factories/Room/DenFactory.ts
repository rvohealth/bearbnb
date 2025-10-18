import { UpdateableProperties } from '@rvoh/dream'
import RoomDen from '@models/Room/Den.js'

export default async function createRoomDen(attrs: UpdateableProperties<RoomDen> = {}) {
  return await RoomDen.create({
    ...attrs,
  })
}
