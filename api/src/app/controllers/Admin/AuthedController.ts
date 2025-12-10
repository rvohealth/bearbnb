import AppEnv from '@conf/AppEnv.js'
import ApplicationController from '@controllers/ApplicationController.js'
import { Encrypt } from '@rvoh/dream/utils'
import { BeforeAction } from '@rvoh/psychic'
import { PsychicOpenapiNames } from '@rvoh/psychic/openapi'
/** uncomment after creating AdminUser model */
// import AdminUser from '@models/AdminUser.js'

export default class AdminAuthedController extends ApplicationController {
  public static override get openapiNames(): PsychicOpenapiNames<ApplicationController> {
    return ['admin', 'tests']
  }

  /** uncomment after creating AdminUser model */
  // protected currentAdminUser: AdminUser

  @BeforeAction()
  // eslint-disable-next-line @typescript-eslint/require-await
  protected async authenticate() {
    /** uncomment after creating AdminUser model */
    //   const adminUserId = this.authedAdminUserId()
    //   if (!adminUserId) return this.unauthorized()
    //
    //   const adminUser = await AdminUser.find(adminUserId)
    //   if (!adminUser) return this.unauthorized()
    //
    //   this.currentAdminUser = adminUser
  }

  protected authedAdminUserId(): string | null {
    if (!AppEnv.isTest)
      throw new Error(
        'The current authentication scheme is only for early development. Replace with a production grade authentication scheme.'
      )

    const token = (this.req.header('Authorization') ?? '').split(' ').at(-1)!

    const decrypted = Encrypt.decrypt(token, {
      algorithm: 'aes-256-gcm',
      key: AppEnv.string('APP_ENCRYPTION_KEY'),
    })

    return (
      (typeof decrypted === 'string' &&
        (JSON.parse(decrypted) as Record<'adminUserId', string>)?.adminUserId) ||
      null
    )
  }
}
