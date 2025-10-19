import { BeforeAction, PsychicController, PsychicOpenapiNames } from '@rvoh/psychic'
import psychicTypes from '@src/types/psychic.js'
import { supportedLocales } from '@src/utils/i18n.js'

export default class ApplicationController extends PsychicController {
  public override get psychicTypes() {
    return psychicTypes
  }

  public static override get openapiNames(): PsychicOpenapiNames<ApplicationController> {
    return ['default', 'mobile', 'validation']
  }

  @BeforeAction()
  public configureSerializers() {
    this.serializerPassthrough({
      locale: this.locale,
    })
  }

  protected get locale() {
    const locale = this.headers['content-language']
    const locales = supportedLocales()
    return locales.includes(locale as (typeof locales)[number]) ? locale : 'en-US'
  }
}
