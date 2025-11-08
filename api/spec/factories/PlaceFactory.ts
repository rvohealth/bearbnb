import { UpdateableProperties } from '@rvoh/dream/types'
import Place from '@models/Place.js'

let counter = 0

export default async function createPlace(attrs: UpdateableProperties<Place> = {}) {
  return await Place.create({
    name: `Place name ${++counter}`,
    style: 'cottage',
    sleeps: 1,
    ...attrs,
  })
}
