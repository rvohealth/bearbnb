import { BeforeAction } from '@rvohealth/psychic'
import Host from '../../../models/Host'
import User from '../../../models/User'
import V1BaseController from '../BaseController'

export default class V1HostBaseController extends V1BaseController {
  protected currentUser: User
  protected currentHost: Host

  @BeforeAction()
  protected async authenticate() {
    if (process.env.NODE_ENV !== 'test') throw new Error(`TODO: Implement authentication scheme!`)
    // implement an authentication pattern that ends with you setting
    // this.currentUser to a user. i.e.:

    const userId = this.req.header('authorization')
    if (!userId) return this.unauthorized()
    const user = await User.leftJoinPreload('host').find(userId)
    if (!user) return this.unauthorized()

    const host = user.host
    if (!host) return this.forbidden()

    this.currentUser = user
    this.currentHost = host
  }
}
