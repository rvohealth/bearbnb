import { BaseScheduledService } from '@rvoh/psychic-workers'
import psychicTypes from '../../types/psychic'

export default class ScheduledService extends BaseScheduledService {
  public get psychicTypes() {
    return psychicTypes
  }
}
