import Room from '../../../../src/app/models/Room'
import LivingRoom from '../../../../src/app/models/Room/LivingRoom'
import createPlace from '../../../factories/PlaceFactory'

describe('Room/LivingRoom', () => {
  it('ensure can save Den models (type enum must match class name of STI children)', async () => {
    const place = await createPlace()

    const den = await LivingRoom.create({ place })
    const room = await Room.findOrFail(den.id)
    expect(room instanceof LivingRoom).toBe(true)
  })
})
