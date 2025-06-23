import { UpdateableProperties } from '@rvoh/dream'
import Den from '../../../src/app/models/Room/Den.js'

export default async function createRoomDen(attrs: UpdateableProperties<Den> = {}) {
  return await Den.create({
    ...attrs,
  })
}
