import { BaseBackgroundedService } from '@rvoh/psychic-workers'
import psychicTypes from '../../types/psychic.js'

export default class ApplicationBackgroundedService extends BaseBackgroundedService {
  public get psychicTypes() {
    return psychicTypes
  }
}
