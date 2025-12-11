import Kitchen from '@models/Room/Kitchen.js'
import { UpdateableProperties } from '@rvoh/dream/types'
import createPlace from '../PlaceFactory.js'

export default async function createRoomKitchen(attrs: UpdateableProperties<Kitchen> = {}) {
  return await Kitchen.create({
    place: attrs.place ? null : await createPlace(),
    appliances: ['stove'],
    ...attrs,
  })
}
