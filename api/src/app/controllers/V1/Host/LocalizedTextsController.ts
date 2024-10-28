import { OpenAPI } from '@rvohealth/psychic'
import LocalizedText from '../../../models/LocalizedText'
import V1HostBaseController from './BaseController'

const openApiTags = ['localized-texts']

export default class V1HostLocalizedTextsController extends V1HostBaseController {
  @OpenAPI(LocalizedText, {
    status: 201,
    tags: openApiTags,
    description: 'Create a LocalizedText',
  })
  public async create() {
    //    const localizedText = await this.currentUser.createAssociation('localizedTexts', this.paramsFor(LocalizedText))
    //    this.created(localizedText)
  }

  @OpenAPI(LocalizedText, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch multiple LocalizedTexts',
    many: true,
    serializerKey: 'summary',
  })
  public async index() {
    //    const localizedTexts = await this.currentUser.associationQuery('localizedTexts').all()
    //    this.ok(localizedTexts)
  }

  @OpenAPI(LocalizedText, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch a LocalizedText',
  })
  public async show() {
    //    const localizedText = await this.localizedText()
    //    this.ok(localizedText)
  }

  @OpenAPI(LocalizedText, {
    status: 204,
    tags: openApiTags,
    description: 'Update a LocalizedText',
  })
  public async update() {
    //    const localizedText = await this.localizedText()
    //    await localizedText.update(this.paramsFor(LocalizedText))
    //    this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a LocalizedText',
  })
  public async destroy() {
    //    const localizedText = await this.localizedText()
    //    await localizedText.destroy()
    //    this.noContent()
  }

  // private async localizedText() {
  //   return await this.currentUser.associationQuery('localizedTexts').findOrFail(
  //     this.castParam('id', 'string')
  //   )
  // }
}
