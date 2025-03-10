import { DatabaseError } from 'pg'
import Bathroom from '../../../../src/app/models/Room/Bathroom'
import createPlace from '../../../factories/PlaceFactory'

describe('Room/Bathroom', () => {
  it('requires bathOrShowerType to be set', async () => {
    let error: DatabaseError
    const place = await createPlace()

    try {
      await Bathroom.create({ place })
    } catch (err) {
      if (err instanceof DatabaseError) error = err
      else throw err
    }

    expect(error!.message).toMatch('violates check constraint "rooms_not_null_bath_or_shower_type"')
  })
})
