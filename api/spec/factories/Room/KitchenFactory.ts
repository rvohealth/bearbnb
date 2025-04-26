import { UpdateableProperties } from '@rvoh/dream'
import Kitchen from '../../../src/app/models/Room/Kitchen.js'
import createPlace from '../PlaceFactory.js'

export default async function createRoomKitchen(attrs: UpdateableProperties<Kitchen> = {}) {
  attrs.place ??= await createPlace()
  attrs.appliances ??= ['stove']
  return await Kitchen.create(attrs)
}
