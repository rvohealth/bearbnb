import { UpdateableProperties } from '@rvohealth/dream'
import LocalizedText from '../../src/app/models/LocalizedText'

let counter = 0

export default async function createLocalizedText(attrs: UpdateableProperties<LocalizedText> = {}) {
  attrs.locale ||= 'en-US'
  attrs.title ||= `LocalizedText title ${++counter}`
  attrs.markdown ||= `LocalizedText markdown ${counter}`
  return await LocalizedText.create(attrs)
}
