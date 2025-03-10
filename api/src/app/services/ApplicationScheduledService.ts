import { BaseScheduledService } from '@rvohealth/psychic-workers'
import psychicTypes from '../../types/psychic'

export default class ApplicationScheduledService extends BaseScheduledService {
  public get psychicTypes() {
    return psychicTypes
  }
}
