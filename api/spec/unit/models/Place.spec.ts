import HostPlace from '@models/HostPlace.js'
import LocalizedText from '@models/LocalizedText.js'
import Place from '@models/Place.js'
import Room from '@models/Room.js'
import createHost from '@spec/factories/HostFactory.js'
import createHostPlace from '@spec/factories/HostPlaceFactory.js'
import createLocalizedText from '@spec/factories/LocalizedTextFactory.js'
import createPlace from '@spec/factories/PlaceFactory.js'
import createRoomKitchen from '@spec/factories/Room/KitchenFactory.js'

describe('Place', () => {
  it('has many Hosts (through hostPlaces)', async () => {
    const host = await createHost()
    const place = await createPlace()
    await createHostPlace({ host, place })

    expect(await place.associationQuery('hosts').all()).toMatchDreamModels([host])
  })

  it('has many LocalizedTexts', async () => {
    const place = await createPlace()
    const localizedText = await createLocalizedText({ localizable: place, locale: 'es-ES' })

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

  it('has one currentLocalizedText', async () => {
    let place = await createPlace()
    const esLocalizedText = await createLocalizedText({ localizable: place, locale: 'es-ES' })

    place = await place.passthrough({ locale: 'es-ES' }).load('currentLocalizedText').execute()

    expect(place.currentLocalizedText).toMatchDreamModel(esLocalizedText)
  })

  context('upon destruction', () => {
    it('soft-deletes associated HostPlaces, Rooms, and LocalizedTexts', async () => {
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
