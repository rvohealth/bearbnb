import { UpdateableProperties } from '@rvohealth/dream'
import RoomDen from '../../../src/app/models/Room/Den'

export default async function createRoomDen(attrs: UpdateableProperties<RoomDen> = {}) {
  return await RoomDen.create(attrs)
}
