import { UpdateableProperties } from '@rvohealth/dream'
import Kitchen from '../../../src/app/models/Room/Kitchen'
import createPlace from '../PlaceFactory'

export default async function createRoomKitchen(attrs: UpdateableProperties<Kitchen> = {}) {
  attrs.place ||= await createPlace()
  attrs.appliances ||= ['stove']
  return await Kitchen.create(attrs)
}
