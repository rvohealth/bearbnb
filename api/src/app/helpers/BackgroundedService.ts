import { BaseBackgroundedService } from '@rvoh/psychic-workers'
import psychicTypes from '../../types/psychic'

export default class BackgroundedService extends BaseBackgroundedService {
  public get psychicTypes() {
    return psychicTypes
  }
}
