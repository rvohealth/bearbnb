import { describe as context } from '@jest/globals'
import createPlace from '../../../factories/PlaceFactory'
import createRoomDen from '../../../factories/Room/DenFactory'
import createRoomKitchen from '../../../factories/Room/KitchenFactory'

describe('Room/Base', () => {
  context('upon creation', () => {
    it('automatically creates English LocalizedText for the Place', async () => {
      // creating a Kitchen as a stand-in for Base since our enum restrictions
      // prevent us from storing a Base Room
      const room = await createRoomKitchen()
      const localizedText = room.localizedTexts[0]
      expect(localizedText.locale).toEqual('en-US')
      expect(localizedText.isPersisted).toBe(true)
    })

    it('automatically sets position, scoped to Place', async () => {
      const place = await createPlace()
      const anotherPlace = await createPlace()

      const kitchen = await createRoomKitchen({ place })
      const anotherKitchen = await createRoomKitchen({ place: anotherPlace })
      const den = await createRoomDen({ place })

      expect(kitchen.position).toEqual(1)
      expect(anotherKitchen.position).toEqual(1)
      expect(den.position).toEqual(2)
    })
  })
})
