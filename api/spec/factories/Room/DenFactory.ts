import Den from '@models/Room/Den.js'
import { UpdateableProperties } from '@rvoh/dream/types'

export default async function createRoomDen(attrs: UpdateableProperties<Den> = {}) {
  return await Den.create({
    ...attrs,
  })
}
