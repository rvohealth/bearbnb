import Place from '@models/Place.js'
import { BeforeAction } from '@rvoh/psychic'
import V1HostBaseController from '../BaseController.js'

export default class V1HostPlacesBaseController extends V1HostBaseController {
  protected currentPlace: Place

  @BeforeAction()
  protected async loadCurrentPlace() {
    this.currentPlace = await this.currentHost
      .associationQuery('places')
      .findOrFail(this.castParam('placeId', 'string'))
  }
}
