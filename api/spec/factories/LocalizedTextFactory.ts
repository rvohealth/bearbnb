import { UpdateableProperties } from '@rvoh/dream'
import LocalizedText from '@models/LocalizedText.js'

let counter = 0

export default async function createLocalizedText(attrs: UpdateableProperties<LocalizedText> = {}) {
  return await LocalizedText.create({
    locale: 'en-US',
    title: `LocalizedText title ${++counter}`,
    markdown: `LocalizedText markdown ${counter}`,
    ...attrs,
  })
}
