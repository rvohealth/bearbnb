import { BaseScheduledService } from '@rvoh/psychic-workers'
import psychicTypes from '@src/types/psychic.js'

export default class ApplicationScheduledService extends BaseScheduledService {
  public override get psychicTypes() {
    return psychicTypes
  }
}
