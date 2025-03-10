import { BaseBackgroundedService } from '@rvohealth/psychic-workers'
import psychicTypes from '../../types/psychic'

export default class ApplicationBackgroundedService extends BaseBackgroundedService {
  public get psychicTypes() {
    return psychicTypes
  }
}
