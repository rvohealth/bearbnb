import LocalizedText from '@models/LocalizedText.js'
import { UpdateableProperties } from '@rvoh/dream'
import createPlace from '@spec/factories/PlaceFactory.js'

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
