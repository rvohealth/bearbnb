import { PsychicController, PsychicOpenapiNames } from '@rvoh/psychic'
import psychicTypes from '../../types/psychic.js'

export default class ApplicationController extends PsychicController {
  public override get psychicTypes() {
    return psychicTypes
  }

  public static override get openapiNames(): PsychicOpenapiNames<ApplicationController> {
    return ['default', 'mobile', 'validation']
  }
}
