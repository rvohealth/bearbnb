import { BeforeAction, PsychicController } from '@rvohealth/psychic'
// import User from '../models/User'

export default class AuthedController extends PsychicController {
  @BeforeAction()
  // eslint-disable-next-line @typescript-eslint/require-await
  protected async authenticate() {
    throw new Error('Every authenticated controller must extend a controller that implements authenticate')
  }
}
