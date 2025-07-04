import { OpenAPI } from '@rvoh/psychic'
import ApplicationModel from '../../../models/ApplicationModel.js'
import HostPlace from '../../../models/HostPlace.js'
import Place from '../../../models/Place.js'
import V1HostBaseController from './BaseController.js'

const openApiTags = ['places']

export default class V1HostPlacesController extends V1HostBaseController {
  @OpenAPI(Place, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch multiple Places',
    many: true,
    serializerKey: 'summary',
  })
  public async index() {
    const places = await this.currentHost.associationQuery('places').preloadFor('summary').all()
    this.ok(places)
  }

  @OpenAPI(Place, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch a Place',
  })
  public async show() {
    const place = await this.place()
    this.ok(place)
  }

  @OpenAPI(Place, {
    status: 201,
    tags: openApiTags,
    description: 'Create a Place',
  })
  public async create() {
    let place = await ApplicationModel.transaction(async txn => {
      const place = await Place.txn(txn).create(this.paramsFor(Place))
      await HostPlace.txn(txn).create({ host: this.currentHost, place })
      return place
    })

    if (place.isPersisted) place = await place.loadFor('default').execute()
    this.created(place)
  }

  @OpenAPI(Place, {
    status: 204,
    tags: openApiTags,
    description: 'Update a Place',
  })
  public async update() {
    const place = await this.place()
    await place.update(this.paramsFor(Place))
    this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a Place',
  })
  public async destroy() {
    const place = await this.place()
    await place.destroy()
    this.noContent()
  }

  private async place() {
    return await this.currentHost
      .associationQuery('places')
      .preloadFor('default')
      .findOrFail(this.castParam('id', 'string'))
  }
}
