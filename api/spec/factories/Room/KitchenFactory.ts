import Kitchen from '@models/Room/Kitchen.js'
import { UpdateableProperties } from '@rvoh/dream'

export default async function createRoomKitchen(attrs: UpdateableProperties<Kitchen> = {}) {
  return await Kitchen.create({
    appliances: ['stove'],
    ...attrs,
  })
}
