import { UpdateableProperties } from '@rvoh/dream'
import Place from '../../src/app/models/Place.js'

let counter = 0

export default async function createPlace(attrs: UpdateableProperties<Place> = {}) {
  attrs.name ||= `Place name ${++counter}`
  attrs.style ||= 'cottage'
  return await Place.create(attrs)
}
