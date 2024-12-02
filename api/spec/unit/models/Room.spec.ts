import { describe as context } from '@jest/globals'

import createLocalizedText from '../../factories/LocalizedTextFactory'
import createPlace from '../../factories/PlaceFactory'
import createRoomBedroom from '../../factories/Room/BedroomFactory'
import createRoomDen from '../../factories/Room/DenFactory'
import createRoomKitchen from '../../factories/Room/KitchenFactory'

describe('Room', () => {
  it('can be saved without a bathOrShowerType', async () => {
    const room = await createRoomDen()
    expect(room.isPersisted).toBe(true)
  })

  it('has many LocalizedTexts', async () => {
    const room = await createRoomDen()
    const localizedText = await createLocalizedText({ localizable: room })

    expect(await room.associationQuery('localizedTexts').last()).toMatchDreamModel(localizedText)
  })

  context('upon creation', () => {
    it('creates en-US LocalizedText for the Room', async () => {
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
      await createRoomBedroom()
      const bedroom = await createRoomBedroom({ place })

      expect(kitchen.position).toEqual(1)
      expect(bedroom.position).toEqual(2)
    })
  })
})
