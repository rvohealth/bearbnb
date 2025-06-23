import { UpdateableProperties } from '@rvoh/dream'
import Place from '../../src/app/models/Place.js'

let counter = 0

export default async function createPlace(attrs: UpdateableProperties<Place> = {}) {
  return await Place.create({
    name: `Place name ${++counter}`,
    style: 'cottage',
    sleeps: 1,
    ...attrs,
  })
}
