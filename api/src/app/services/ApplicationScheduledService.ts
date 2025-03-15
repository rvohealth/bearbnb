import { BaseScheduledService } from '@rvoh/psychic-workers'
import psychicTypes from '../../types/psychic.js'

export default class ApplicationScheduledService extends BaseScheduledService {
  public get psychicTypes() {
    return psychicTypes
  }
}
