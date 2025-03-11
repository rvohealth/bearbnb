import { UpdateableProperties } from '@rvoh/dream'
import Place from '../../src/app/models/Place'

let counter = 0

export default async function createPlace(attrs: UpdateableProperties<Place> = {}) {
  attrs.name ||= `Place name ${++counter}`
  attrs.style ||= 'cottage'
  attrs.sleeps = attrs.sleeps ?? 1
  return await Place.create(attrs)
}
