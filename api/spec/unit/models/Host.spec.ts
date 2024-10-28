import { describe as context } from '@jest/globals'
import createHost from '../../factories/HostFactory'

describe('Host', () => {
  context('upon creation', () => {
    it('automatically creates English LocalizedText for the Host', async () => {
      const host = await createHost()
      const localizedText = host.localizedTexts[0]
      expect(localizedText.locale).toEqual('en-US')
      expect(localizedText.isPersisted).toBe(true)
    })
  })
})
