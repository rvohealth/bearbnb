import { describe as context } from '@jest/globals'

import createPlace from '../../factories/PlaceFactory'

describe('Place', () => {
  context('upon creation', () => {
    it('automatically creates English LocalizedText for the Place', async () => {
      const host = await createPlace()
      const localizedText = host.localizedTexts[0]
      expect(localizedText.locale).toEqual('en-US')
      expect(localizedText.isPersisted).toBe(true)
    })
  })
})
