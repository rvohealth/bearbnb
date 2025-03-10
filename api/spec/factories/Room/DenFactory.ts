import { UpdateableProperties } from '@rvohealth/dream'
import Den from '../../../src/app/models/Room/Den'

export default async function createRoomDen(attrs: UpdateableProperties<Den> = {}) {
  return await Den.create(attrs)
}
