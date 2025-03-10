import { UpdateableProperties } from '@rvohealth/dream'
import Kitchen from '../../../src/app/models/Room/Kitchen'

let counter = 0

export default async function createRoomKitchen(attrs: UpdateableProperties<Kitchen> = {}) {
  attrs.appliances ||= 'stove'
  return await Kitchen.create(attrs)
}
