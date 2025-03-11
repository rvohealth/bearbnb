import createHost from '../../factories/HostFactory'
import createHostPlace from '../../factories/HostPlaceFactory'
import createLocalizedText from '../../factories/LocalizedTextFactory'
import createPlace from '../../factories/PlaceFactory'

describe('Host', () => {
  it('has many Places (through hostPlaces)', async () => {
    const host = await createHost()
    const place = await createPlace()
    await createHostPlace({ host, place })

    expect(await host.associationQuery('places').all()).toMatchDreamModels([place])
  })

  it('has many LocalizedTexts', async () => {
    const host = await createHost()
    const localizedText = await createLocalizedText({ localizable: host })

    expect(await host.associationQuery('localizedTexts').last()).toMatchDreamModel(localizedText)
  })

  it('has one currentLocalizedText', async () => {
    const host = await createHost()
    const esLocalizedText = await createLocalizedText({ localizable: host, locale: 'es-ES' })

    expect(
      await host.associationQuery('currentLocalizedText', { on: { locale: 'es-ES' } }).first(),
    ).toMatchDreamModel(esLocalizedText)
  })

  context('upon creation', () => {
    it('creates en-US LocalizedText for the Host', async () => {
      const host = await createHost()
      const localizedText = await host.associationQuery('localizedTexts').firstOrFail()

      expect(localizedText.locale).toEqual('en-US')
    })
  })
})
