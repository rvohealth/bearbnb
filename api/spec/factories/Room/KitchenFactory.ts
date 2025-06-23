import { UpdateableProperties } from '@rvoh/dream'
import Kitchen from '../../../src/app/models/Room/Kitchen.js'
import createPlace from '../PlaceFactory.js'

export default async function createRoomKitchen(attrs: UpdateableProperties<Kitchen> = {}) {
  return await Kitchen.create({
    place: attrs.place ? null : await createPlace(),
    appliances: ['stove'],
    ...attrs,
  })
}
