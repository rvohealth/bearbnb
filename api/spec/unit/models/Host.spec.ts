import createHost from '../../factories/HostFactory.js'
import createHostPlace from '../../factories/HostPlaceFactory.js'
import createPlace from '../../factories/PlaceFactory.js'

describe('Host', () => {
  it('has many Places (through hostPlaces)', async () => {
    const host = await createHost()
    const place = await createPlace()
    await createHostPlace({ host, place })

    expect(await host.associationQuery('places').all()).toMatchDreamModels([place])
  })
})
