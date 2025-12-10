import { BaseScheduledService } from '@rvoh/psychic-workers'
import psychicWorkerTypes from '@src/types/workers.js'

export default class ApplicationScheduledService extends BaseScheduledService {
  public override get psychicWorkerTypes() {
    return psychicWorkerTypes
  }
}
