import { OpenAPI } from '@rvoh/psychic'
import Place from '../../../models/Place.js'
import V1GuestBaseController from './BaseController.js'

const openApiTags = ['v1-guest-places']

export default class V1GuestPlacesController extends V1GuestBaseController {
  @OpenAPI(Place, {
    status: 200,
    tags: openApiTags,
    description: 'Place index endpoint for Guests',
    many: true,
    // https://psychicframework.com/docs/openapi/pagination
    paginate: true,
    serializerKey: 'summaryForGuests',
  })
  public async index() {
    this.ok(
      await Place.passthrough({ locale: this.locale })
        .preloadFor('summaryForGuests')
        // https://psychicframework.com/docs/models/querying/paginate
        .paginate({ page: this.castParam('page', 'integer', { allowNull: true }) }),
    )
  }

  @OpenAPI(Place, {
    status: 200,
    tags: openApiTags,
    description: 'Place show endpoint for Guests',
    serializerKey: 'forGuests',
  })
  public async show() {
    this.ok(
      await Place.passthrough({ locale: this.locale })
        .preloadFor('forGuests')
        .findOrFail(this.castParam('id', 'bigint')),
    )
  }
}
