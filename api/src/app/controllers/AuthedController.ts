import AppEnv from '@conf/AppEnv.js'
import ApplicationController from '@controllers/ApplicationController.js'
import User from '@models/User.js'
import { Encrypt } from '@rvoh/dream/utils'
import { BeforeAction } from '@rvoh/psychic'
import { supportedLocales } from '@src/utils/i18n.js'

export default class AuthedController extends ApplicationController {
  protected currentUser: User

  @BeforeAction()
  protected async authenticate() {
    const userId = this.authedUserId()
    if (!userId) return this.unauthorized()

    const user = await User.find(userId)
    if (!user) return this.unauthorized()

    this.currentUser = user
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

  protected authedUserId(): string | null {
    if (!AppEnv.isTest)
      throw new Error(
        'The current authentication scheme is only for early development. Replace with a production grade authentication scheme.',
      )

    const token = (this.req.header('Authorization') ?? '').split(' ').at(-1)!

    const decrypted = Encrypt.decrypt(token, {
      algorithm: 'aes-256-gcm',
      key: AppEnv.string('APP_ENCRYPTION_KEY'),
    })

    return (
      (typeof decrypted === 'string' && (JSON.parse(decrypted) as Record<'userId', string>)?.userId) || null
    )
  }
}
