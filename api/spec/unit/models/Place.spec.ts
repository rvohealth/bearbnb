import createHost from '../../factories/HostFactory.js'
import createHostPlace from '../../factories/HostPlaceFactory.js'
import createLocalizedText from '../../factories/LocalizedTextFactory.js'
import createPlace from '../../factories/PlaceFactory.js'

describe('Place', () => {
  it('has many Hosts (through hostPlaces)', async () => {
    const host = await createHost()
    const place = await createPlace()
    await createHostPlace({ host, place })

    expect(await place.associationQuery('hosts').all()).toMatchDreamModels([host])
  })

  it('has many LocalizedTexts', async () => {
    const place = await createPlace()
    const localizedText = await createLocalizedText({ localizable: place })

    expect(await place.associationQuery('localizedTexts').last()).toMatchDreamModel(localizedText)
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
