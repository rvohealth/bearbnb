import { UpdateableProperties } from '@rvohealth/dream'
import Kitchen from '../../../src/app/models/Room/Kitchen'
import createPlace from '../PlaceFactory'

export default async function createRoomKitchen(attrs: UpdateableProperties<Kitchen> = {}) {
  attrs.appliances ||= ['stove']
  attrs.place ||= await createPlace()
  return await Kitchen.create(attrs)
}
