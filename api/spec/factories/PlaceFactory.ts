import { UpdateableProperties } from '@rvoh/dream'
import Place from '../../src/app/models/Place.js'

let counter = 0

export default async function createPlace(attrs: UpdateableProperties<Place> = {}) {
  attrs.name ||= `Place name ${++counter}`
  attrs.style ||= 'cottage'
  // If your editor says there is a type error while you are following allong with the steps to create BearBnB,
  // run `Restart TS Server` (command-shift-p and type "Restart TS Server" in VSCode). Editors sometime have
  // trouble updating to reflect changes to files that are not open in the editor, as when Dream or Psychic
  // update the type files in api/src/types/
  attrs.sleeps = attrs.sleeps ?? 1
  return await Place.create(attrs)
}
