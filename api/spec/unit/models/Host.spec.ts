import createHost from '../../factories/HostFactory'
import createHostPlace from '../../factories/HostPlaceFactory'
import createPlace from '../../factories/PlaceFactory'

describe('Host', () => {
  it('has many Places (through hostPlaces)', async () => {
    const host = await createHost()
    const place = await createPlace()
    await createHostPlace({ host, place })

    expect(await host.associationQuery('places').all()).toMatchDreamModels([place])
  })
})
