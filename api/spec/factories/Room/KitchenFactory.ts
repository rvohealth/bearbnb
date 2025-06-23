import { UpdateableProperties } from '@rvoh/dream'
import Kitchen from '../../../src/app/models/Room/Kitchen.js'

export default async function createRoomKitchen(attrs: UpdateableProperties<Kitchen> = {}) {
  return await Kitchen.create({
    appliances: 'stove',
    ...attrs,
  })
}
