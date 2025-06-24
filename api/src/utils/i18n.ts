import { I18nProvider } from '@rvoh/psychic'
import locales from '../conf/locales/index.js'
import { LocalesEnumValues } from '../types/db.js'

export function supportedLocales() {
  return LocalesEnumValues
}

export default I18nProvider.provide(locales, 'en')
