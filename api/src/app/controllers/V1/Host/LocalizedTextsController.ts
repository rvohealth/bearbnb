import { OpenAPI } from '@rvoh/psychic'
import V1HostBaseController from './BaseController.js'
import LocalizedText from '@models/LocalizedText.js'

const openApiTags = ['localized-texts']

export default class V1HostLocalizedTextsController extends V1HostBaseController {
  @OpenAPI(LocalizedText, {
    status: 204,
    tags: openApiTags,
    description: 'Update a LocalizedText',
  })
  public async update() {
    // const localizedText = await this.localizedText()
    // await localizedText.update(this.paramsFor(LocalizedText))
    // this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a LocalizedText',
  })
  public async destroy() {
    // const localizedText = await this.localizedText()
    // await localizedText.destroy()
    // this.noContent()
  }

  private async localizedText() {
    // return await this.currentUser.associationQuery('localizedTexts')
    //   .preloadFor('default')
    //   .findOrFail(this.castParam('id', 'string'))
  }
}
