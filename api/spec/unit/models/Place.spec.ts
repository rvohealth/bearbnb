import createHost from '@spec/factories/HostFactory.js'
import createHostPlace from '@spec/factories/HostPlaceFactory.js'
import createLocalizedText from '@spec/factories/LocalizedTextFactory.js'
import createPlace from '@spec/factories/PlaceFactory.js'

describe('Place', () => {
  it('has many Hosts (through hostPlaces)', async () => {
    const host = await createHost()
    const place = await createPlace()
    await createHostPlace({ host, place })

    expect(await place.associationQuery('hosts').all()).toMatchDreamModels([host])
  })

  it('has many LocalizedTexts', async () => {
    const place = await createPlace()
    const esLocalizedText = await createLocalizedText({ localizable: place, locale: 'es-ES' })

    const localizedText = await place.associationQuery('localizedTexts', { and: { locale: 'es-ES' } }).last()
    expect(localizedText).toMatchDreamModel(esLocalizedText)
  })

  context('upon creation', () => {
    it('creates en-US LocalizedText for the Place', async () => {
      const place = await createPlace({ style: 'cottage' })
      const localizedText = await place.associationQuery('localizedTexts').firstOrFail()

      expect(localizedText.locale).toEqual('en-US')
      expect(localizedText.title).toEqual('My cottage')
    })
  })
})
