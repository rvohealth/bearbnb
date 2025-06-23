import { PsychicOpenapiNames } from '@rvoh/psychic'
import ApplicationController from '../ApplicationController.js'

export default class AdminUnauthedController extends ApplicationController {
  public static override get openapiNames(): PsychicOpenapiNames<ApplicationController> {
    return ['admin', 'validation']
  }
}
