import { BaseBackgroundedService } from '@rvoh/psychic-workers'
import psychicWorkerTypes from '@src/types/workers.js'

export default class ApplicationBackgroundedService extends BaseBackgroundedService {
  public override get psychicWorkerTypes() {
    return psychicWorkerTypes
  }
}
