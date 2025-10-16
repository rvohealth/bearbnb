import ApplicationController from '@controllers/ApplicationController.js'
import { PsychicOpenapiNames } from '@rvoh/psychic'

export default class AdminUnauthedController extends ApplicationController {
  public static override get openapiNames(): PsychicOpenapiNames<ApplicationController> {
    return ['admin', 'validation']
  }
}
