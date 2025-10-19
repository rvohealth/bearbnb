import locales from '@conf/locales/index.js'
import { I18nProvider } from '@rvoh/psychic'
import { LocalesEnumValues } from '@src/types/db.js'

export function supportedLocales() {
  return LocalesEnumValues
}

export default I18nProvider.provide(locales, 'en')
