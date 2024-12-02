import { describe as context } from '@jest/globals'
import HostPlace from '../../../src/app/models/HostPlace'
import LocalizedText from '../../../src/app/models/LocalizedText'
import Place from '../../../src/app/models/Place'
import Room from '../../../src/app/models/Room'
import createHostPlace from '../../factories/HostPlaceFactory'
import createLocalizedText from '../../factories/LocalizedTextFactory'
import createPlace from '../../factories/PlaceFactory'
import createRoomKitchen from '../../factories/Room/KitchenFactory'

describe('Place', () => {
  it('has many LocalizedTexts', async () => {
    const place = await createPlace()
    const localizedText = await createLocalizedText({ localizable: place })

    expect(await place.associationQuery('localizedTexts').last()).toMatchDreamModel(localizedText)
  })

  context('upon creation', () => {
    it('creates en-US LocalizedText for the Place', async () => {
      const place = await createPlace({ style: 'cottage' })
      const localizedText = await place.associationQuery('localizedTexts').firstOrFail()

      expect(localizedText.locale).toEqual('en-US')
      expect(localizedText.title).toEqual('My cottage')
    })
  })

  context('upon destruction', () => {
    it.only('soft-deletes associated HostPlaces, Rooms, and LocalizedTexts', async () => {
      const place = await createPlace()
      const hostPlace = await createHostPlace({ place })
      const room = await createRoomKitchen({ place })
      const placeText = await place.associationQuery('localizedTexts').firstOrFail()
      const roomText = await room.associationQuery('localizedTexts').firstOrFail()

      expect(await Place.where({ id: place.id }).exists()).toBe(true)
      expect(await HostPlace.where({ id: hostPlace.id }).exists()).toBe(true)
      expect(await Room.where({ id: room.id }).exists()).toBe(true)
      expect(await LocalizedText.where({ id: placeText.id }).exists()).toBe(true)
      expect(await LocalizedText.where({ id: roomText.id }).exists()).toBe(true)

      await place.destroy()

      expect(await Place.where({ id: place.id }).exists()).toBe(false)
      expect(await HostPlace.where({ id: hostPlace.id }).exists()).toBe(false)
      expect(await Room.where({ id: room.id }).exists()).toBe(false)
      expect(await LocalizedText.where({ id: placeText.id }).exists()).toBe(false)
      expect(await LocalizedText.where({ id: roomText.id }).exists()).toBe(false)

      expect(await Place.removeAllDefaultScopes().where({ id: place.id }).exists()).toBe(true)
      expect(await HostPlace.removeAllDefaultScopes().where({ id: hostPlace.id }).exists()).toBe(true)
      expect(await Room.removeAllDefaultScopes().where({ id: room.id }).exists()).toBe(true)
      expect(await LocalizedText.removeAllDefaultScopes().where({ id: placeText.id }).exists()).toBe(true)
      expect(await LocalizedText.removeAllDefaultScopes().where({ id: roomText.id }).exists()).toBe(true)
    })
  })
})
