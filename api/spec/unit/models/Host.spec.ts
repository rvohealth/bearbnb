import createHost from '../../factories/HostFactory.js'
import createHostPlace from '../../factories/HostPlaceFactory.js'
import createLocalizedText from '../../factories/LocalizedTextFactory.js'
import createPlace from '../../factories/PlaceFactory.js'

describe('Host', () => {
  it('has many Places (through hostPlaces)', async () => {
    const host = await createHost()
    const place = await createPlace()
    await createHostPlace({ host, place })

    expect(await host.associationQuery('places').all()).toMatchDreamModels([place])
  })

  it('has many LocalizedTexts', async () => {
    const host = await createHost()
    const localizedText = await createLocalizedText({ localizable: host, locale: 'es-ES' })

    expect(await host.associationQuery('localizedTexts').last()).toMatchDreamModel(localizedText)
  })

  it('has one currentLocalizedText', async () => {
    let host = await createHost()
    const esLocalizedText = await createLocalizedText({ localizable: host, locale: 'es-ES' })

    host = await host.passthrough({ locale: 'es-ES' }).load('currentLocalizedText').execute()

    expect(host.currentLocalizedText).toMatchDreamModel(esLocalizedText)
  })

  context('upon creation', () => {
    it('creates en-US LocalizedText for the Host', async () => {
      const host = await createHost()
      const localizedText = await host.associationQuery('localizedTexts').firstOrFail()

      expect(localizedText.locale).toEqual('en-US')
    })
  })
})
