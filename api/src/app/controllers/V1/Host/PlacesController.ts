import { OpenAPI } from '@rvoh/psychic'
import V1HostBaseController from './BaseController.js'
import Place from '@models/Place.js'

const openApiTags = ['places']

export default class V1HostPlacesController extends V1HostBaseController {
  @OpenAPI(Place, {
    status: 200,
    tags: openApiTags,
    description: 'Paginated index of Places',
    scrollPaginate: true,
    serializerKey: 'summary',
  })
  public async index() {
    // const places = await this.currentHost.associationQuery('places')
    //   .preloadFor('summary')
    //   .order({ createdAt: 'desc' })
    //   .scrollPaginate({ cursor: this.castParam('cursor', 'string', { allowNull: true }) })
    // this.ok(places)
  }

  @OpenAPI(Place, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch a Place',
  })
  public async show() {
    // const place = await this.place()
    // this.ok(place)
  }

  @OpenAPI(Place, {
    status: 201,
    tags: openApiTags,
    description: 'Create a Place',
  })
  public async create() {
    // let place = await this.currentHost.createAssociation('places', this.paramsFor(Place))
    // if (place.isPersisted) place = await place.loadFor('default').execute()
    // this.created(place)
  }

  @OpenAPI(Place, {
    status: 204,
    tags: openApiTags,
    description: 'Update a Place',
  })
  public async update() {
    // const place = await this.place()
    // await place.update(this.paramsFor(Place))
    // this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a Place',
  })
  public async destroy() {
    // const place = await this.place()
    // await place.destroy()
    // this.noContent()
  }

  private async place() {
    // return await this.currentHost.associationQuery('places')
    //   .preloadFor('default')
    //   .findOrFail(this.castParam('id', 'string'))
  }
}
