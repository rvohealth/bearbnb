import { describe as context } from '@jest/globals'
import createRoomKitchen from '../../../factories/Room/KitchenFactory'

describe('Room/Base', () => {
  context('upon creation', () => {
    it('automatically creates English LocalizedText for the Place', async () => {
      // creating a Kitchen as a stand-in for Base since our enum restrictions
      // prevent us from storing a Base Room
      const host = await createRoomKitchen()
      const localizedText = host.localizedTexts[0]
      expect(localizedText.locale).toEqual('en-US')
      expect(localizedText.isPersisted).toBe(true)
    })
  })
})
