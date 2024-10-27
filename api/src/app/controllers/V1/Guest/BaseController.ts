import { BeforeAction } from '@rvohealth/psychic'
import User from '../../../models/User'
import V1BaseController from '../BaseController'

export default class V1GuestBaseController extends V1BaseController {
  protected currentUser: User

  @BeforeAction()
  protected async authenticate() {
    if (!['test', 'development'].includes(process.env.NODE_ENV as string))
      throw new Error('The current authentication scheme is for demo ONLY')

    const userId = this.req.header('authorization')
    if (!userId) return this.unauthorized()

    const user = await User.leftJoinPreload('guest').find(userId)
    if (!user) return this.unauthorized()

    this.currentUser = user
  }

  protected get currentGuest() {
    return this.currentUser.guest
  }
}
