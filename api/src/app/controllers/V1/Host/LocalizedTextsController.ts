import { OpenAPI } from '@rvoh/psychic'
import LocalizedText from '../../../models/LocalizedText.js'
import Place from '../../../models/Place.js'
import Room from '../../../models/Room.js'
import V1HostBaseController from './BaseController.js'

const openApiTags = ['localized-texts']

export default class V1HostLocalizedTextsController extends V1HostBaseController {
  @OpenAPI(LocalizedText, {
    status: 204,
    tags: openApiTags,
    description: 'Update a LocalizedText',
  })
  public async update() {
    const localizedText = await this.localizedText()
    await localizedText.update(this.paramsFor(LocalizedText))
    this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a LocalizedText',
  })
  public async destroy() {
    const localizedText = await this.localizedText()
    await localizedText.destroy()
    this.noContent()
  }

  private async localizedText() {
    const localizedText = await LocalizedText.preload('localizable').findOrFail(
      this.castParam('id', 'string'),
    )

    const localizable = localizedText.localizable

    switch (localizedText.localizableType) {
      case 'Host':
        if (!localizable.equals(this.currentHost)) this.notFound()
        return localizedText

      case 'Place':
        // the next line safely informs typescript that localizable is a Place
        if (!(localizable instanceof Place)) throw new Error('unreachable')

        if (!(await localizable.associationQuery('hosts', { and: { id: this.currentHost.id } }).exists()))
          this.notFound()

        return localizedText

      case 'Room':
        // the next line safely informs typescript that localizable is a Room
        if (!(localizable instanceof Room)) throw new Error('unreachable')

        if (
          !(await localizable
            .query()
            .innerJoin('place', 'hosts', { and: { id: this.currentHost.id } })
            .exists())
        )
          this.notFound()

        return localizedText

      default:
        this.notFound()
        // notFound already throws an exception, but Typescript doesn't know that; the following
        // line informs typescript that this method always returns a LocalizableText
        throw new Error('unreachable')
    }
  }
}
