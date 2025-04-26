import Room from '../../../../src/app/models/Room.js'
import Den from '../../../../src/app/models/Room/Den.js'
import createPlace from '../../../factories/PlaceFactory.js'

describe('Room/Den', () => {
  it('ensure can save Den models (type enum must match class name of STI children)', async () => {
    const place = await createPlace()

    const den = await Den.create({ place })
    const room = await Room.findOrFail(den.id)
    expect(room instanceof Den).toBe(true)
  })
})
