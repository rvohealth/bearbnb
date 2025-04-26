import Bedroom from '../../../../src/app/models/Room/Bedroom.js'
import createPlace from '../../../factories/PlaceFactory.js'

describe('Room/Bedroom', () => {
  it('defaults bedTypes to an empty array', async () => {
    const place = await createPlace()

    const room = await Bedroom.create({ place })
    expect(room.bedTypes).toEqual([])
  })
})
