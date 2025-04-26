import { BeforeAction, PsychicOpenapiNames } from '@rvoh/psychic'
import ApplicationController from '../ApplicationController.js'

export default class AdminAuthedController extends ApplicationController {
  public static override get openapiNames(): PsychicOpenapiNames<ApplicationController> {
    return ['admin', 'validation']
  }

  // protected currentAdminUser: User

  @BeforeAction()
  // eslint-disable-next-line @typescript-eslint/require-await
  protected async authenticate() {
    throw new Error(`TODO: Implement admin authentication scheme!`)
    // implement an authentication pattern that ends with you setting
    // this.currentAdminUser to an admin user. i.e.
    //
    // const adminToken = this.req.headers['token']
    // const adminUserId = Encrypt.decrypt(token)
    // this.currentAdminUser = await AdminUser.find(adminUserId)
    //
    //
    // const adminUserId = this.getCookie('adminToken')
    // const adminUser = await AdminUser.find(adminUserId)
    // if (!adminUser) return this.unauthorized()

    // this.currentAdminUser = adminUser
  }
}
