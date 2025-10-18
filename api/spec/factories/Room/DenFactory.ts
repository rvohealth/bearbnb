import Den from '@models/Room/Den.js'
import { UpdateableProperties } from '@rvoh/dream'

export default async function createRoomDen(attrs: UpdateableProperties<Den> = {}) {
  return await Den.create({
    ...attrs,
  })
}
