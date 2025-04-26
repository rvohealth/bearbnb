import LocalizedText from '../../../src/app/models/LocalizedText.js'
import createHost from '../../factories/HostFactory.js'
import createLocalizedText from '../../factories/LocalizedTextFactory.js'

describe('LocalizedText', () => {
  it('belongs to "localizable"', async () => {
    const host = await createHost()
    const localizedText = await createLocalizedText({ localizable: host })

    const reloaded = await LocalizedText.preload('localizable').findOrFail(localizedText.id)
    expect(reloaded.localizable).toMatchDreamModel(host)
  })
})
