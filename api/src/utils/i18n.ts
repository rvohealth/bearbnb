import locales from '@conf/locales/index.js'
import { I18nProvider } from '@rvoh/psychic'

const SUPPORTED_LOCALES = ['en-US']
export function supportedLocales() {
  return SUPPORTED_LOCALES
}

export default I18nProvider.provide(locales, 'en')
