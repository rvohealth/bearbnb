import Kitchen from '../../../../src/app/models/Room/Kitchen.js'
import createPlace from '../../../factories/PlaceFactory.js'

describe('Room/Kitchen', () => {
  it('defaults appliances to an empty array', async () => {
    const place = await createPlace()

    const room = await Kitchen.create({ place })
    expect(room.appliances).toEqual([])
  })
})
