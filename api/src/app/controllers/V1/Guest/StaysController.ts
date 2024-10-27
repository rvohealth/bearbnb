import { OpenAPI } from '@rvohealth/psychic'
import V1GuestBaseController from './BaseController'
import Stay from '../../../models/Stay'

const openApiTags = ['stays']

export default class V1GuestStaysController extends V1GuestBaseController {
  @OpenAPI(Stay, {
    status: 201,
    tags: openApiTags,
    description: 'Create a Stay',
  })
  public async create() {
    //    const stay = await this.currentUser.createAssociation('stays', this.paramsFor(Stay))
    //    this.created(stay)
  }

  @OpenAPI(Stay, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch multiple Stays',
    many: true,
    serializerKey: 'summary',
  })
  public async index() {
    //    const stays = await this.currentUser.associationQuery('stays').all()
    //    this.ok(stays)
  }

  @OpenAPI(Stay, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch a Stay',
  })
  public async show() {
    //    const stay = await this.stay()
    //    this.ok(stay)
  }

  @OpenAPI(Stay, {
    status: 204,
    tags: openApiTags,
    description: 'Update a Stay',
  })
  public async update() {
    //    const stay = await this.stay()
    //    await stay.update(this.paramsFor(Stay))
    //    this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a Stay',
  })
  public async destroy() {
    //    const stay = await this.stay()
    //    await stay.destroy()
    //    this.noContent()
  }

  private async stay() {
    return await this.currentUser.associationQuery('stays').findOrFail(
      this.castParam('id', 'string')
    )
  }
}
