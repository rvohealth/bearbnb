import { describe as context } from '@jest/globals'

import createHost from '../../factories/HostFactory'
import createHostPlace from '../../factories/HostPlaceFactory'
import createLocalizedText from '../../factories/LocalizedTextFactory'
import createPlace from '../../factories/PlaceFactory'

describe('Host', () => {
  it('has many Places', async () => {
    const host = await createHost()
    const place = await createPlace()
    await createHostPlace({ host, place })

    expect(await host.associationQuery('places').all()).toMatchDreamModels([place])
  })

  it('has many LocalizedTexts', async () => {
    const host = await createHost()
    const localizedText = await createLocalizedText({ localizable: host })

    expect(await host.associationQuery('localizedTexts').all()).toMatchDreamModels([localizedText])
  })

  context('upon creation', () => {
    it('creates en-US LocalizedText for the Host', async () => {
      const host = await createHost()
      const localizedText = await host.associationQuery('localizedTexts').firstOrFail()

      expect(localizedText.locale).toEqual('en-US')
    })
  })
})
