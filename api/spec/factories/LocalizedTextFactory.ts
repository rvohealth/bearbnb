import { UpdateableProperties } from '@rvoh/dream'
import LocalizedText from '../../src/app/models/LocalizedText.js'
import createPlace from './PlaceFactory.js'

let counter = 0

export default async function createLocalizedText(attrs: UpdateableProperties<LocalizedText> = {}) {
  return await LocalizedText.create({
    localizable: attrs.localizable ? null : await createPlace(),
    locale: 'en-US',
    title: `LocalizedText title ${++counter}`,
    markdown: `LocalizedText markdown ${counter}`,
    ...attrs,
  })
}
