import { PsychicController, PsychicOpenapiNames } from '@rvoh/psychic'
import psychicTypes from '../../types/psychic.js'

export default class ApplicationController extends PsychicController {
  public get psychicTypes() {
    return psychicTypes
  }

  public static get openapiNames(): PsychicOpenapiNames<ApplicationController> {
    return ['default', 'mobile']
  }
}
