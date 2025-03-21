import createLocalizedText from '../../factories/LocalizedTextFactory.js'
import createPlace from '../../factories/PlaceFactory.js'
import createRoomBedroom from '../../factories/Room/BedroomFactory.js'
import createRoomDen from '../../factories/Room/DenFactory.js'
import createRoomKitchen from '../../factories/Room/KitchenFactory.js'
import createRoomLivingRoom from '../../factories/Room/LivingRoomFactory.js'

describe('Room', () => {
  it('has many LocalizedTexts', async () => {
    // using Den as a stand-in for any Room since STI base models cannot be
    // saved to the database (enforced by intentionally omitting the base
    // STI model controller name from the enum values allowed for `type`)
    const room = await createRoomDen()
    const localizedText = await createLocalizedText({ localizable: room })

    expect(await room.associationQuery('localizedTexts').last()).toMatchDreamModel(localizedText)
  })

  it('has one currentLocalizedText', async () => {
    // using Den as a stand-in for any Room since STI base models cannot be
    // saved to the database (enforced by intentionally omitting the base
    // STI model controller name from the enum values allowed for `type`)
    const room = await createRoomDen()
    const esLocalizedText = await createLocalizedText({ localizable: room, locale: 'es-ES' })

    expect(
      await room.associationQuery('currentLocalizedText', { on: { locale: 'es-ES' } }).first(),
    ).toMatchDreamModel(esLocalizedText)
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

  describe('position', () => {
    it('is automatically set and scoped to Place', async () => {
      const place = await createPlace()
      const kitchen = await createRoomKitchen({ place })
      const otherBedroom = await createRoomBedroom()
      const bedroom = await createRoomBedroom({ place })
      const livingRoom = await createRoomLivingRoom({ place })

      expect(kitchen.position).toEqual(1)
      expect(bedroom.position).toEqual(2)
      expect(livingRoom.position).toEqual(3)
      expect(otherBedroom.position).toEqual(1)

      await livingRoom.update({ position: 1 })

      await kitchen.reload()
      await bedroom.reload()
      await livingRoom.reload()

      expect(kitchen.position).toEqual(2)
      expect(bedroom.position).toEqual(3)
      expect(livingRoom.position).toEqual(1)

      await livingRoom.destroy()

      await kitchen.reload()
      await bedroom.reload()

      expect(kitchen.position).toEqual(1)
      expect(bedroom.position).toEqual(2)
    })
  })
})
