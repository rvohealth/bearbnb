import createLocalizedText from '@spec/factories/LocalizedTextFactory.js'
import createRoomDen from '@spec/factories/Room/DenFactory.js'

describe('Room', () => {
  it('has many LocalizedTexts', async () => {
    // using Den as a stand-in for any Room since STI base models cannot be
    // saved to the database (enforced by intentionally omitting the base
    // STI model controller name from the enum values allowed for `type`)
    const room = await createRoomDen()
    const esLocalizedText = await createLocalizedText({ localizable: room, locale: 'es-ES' })

    const localizedText = await room.associationQuery('localizedTexts', { and: { locale: 'es-ES' } }).last()
    expect(localizedText).toMatchDreamModel(esLocalizedText)
  })

  context('upon creation', () => {
    it('creates en-US LocalizedText for the Room', async () => {
      // using Den as a stand-in for any Room since STI base models cannot be
      // saved to the database (enforced by intentionally omitting the base
      // STI model controller name from the enum values allowed for `type`)
      const room = await createRoomDen()
      const localizedText = await room.associationQuery('localizedTexts').firstOrFail()

      expect(localizedText.locale).toEqual('en-US')
      expect(localizedText.title).toEqual('Den')
    })
  })
})
