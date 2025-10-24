import { BaseBackgroundedService } from '@rvoh/psychic-workers'
import psychicTypes from '@src/types/psychic.js'

export default class ApplicationBackgroundedService extends BaseBackgroundedService {
  public override get psychicTypes() {
    return psychicTypes
  }
}
