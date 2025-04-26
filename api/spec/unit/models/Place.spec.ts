import createHost from '../../factories/HostFactory.js'
import createHostPlace from '../../factories/HostPlaceFactory.js'
import createPlace from '../../factories/PlaceFactory.js'

describe('Place', () => {
  it('has many Hosts (through hostPlaces)', async () => {
    const host = await createHost()
    const place = await createPlace()
    await createHostPlace({ host, place })

    expect(await place.associationQuery('hosts').all()).toMatchDreamModels([host])
  })
})
