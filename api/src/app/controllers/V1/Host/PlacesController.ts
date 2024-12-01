import { OpenAPI } from '@rvohealth/psychic'
import Place from '../../../models/Place'
import V1HostBaseController from './BaseController'

const openApiTags = ['places']

export default class V1HostPlacesController extends V1HostBaseController {
  @OpenAPI(Place, {
    status: 201,
    tags: openApiTags,
    description: 'Create a Place',
  })
  public async create() {
    //    const place = await this.currentUser.createAssociation('places', this.paramsFor(Place))
    //    this.created(place)
  }

  @OpenAPI(Place, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch multiple Places',
    many: true,
    serializerKey: 'summary',
  })
  public async index() {
    //    const places = await this.currentUser.associationQuery('places').all()
    //    this.ok(places)
  }

  @OpenAPI(Place, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch a Place',
  })
  public async show() {
    //    const place = await this.place()
    //    this.ok(place)
  }

  @OpenAPI(Place, {
    status: 204,
    tags: openApiTags,
    description: 'Update a Place',
  })
  public async update() {
    //    const place = await this.place()
    //    await place.update(this.paramsFor(Place))
    //    this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a Place',
  })
  public async destroy() {
    //    const place = await this.place()
    //    await place.destroy()
    //    this.noContent()
  }

  private async place() {
    // return await this.currentUser.associationQuery('places').findOrFail(
    //   this.castParam('id', 'string')
    // )
  }
}
