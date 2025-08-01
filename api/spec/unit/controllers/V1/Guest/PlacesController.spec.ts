import Place from '../../../../../src/app/models/Place.js'
import User from '../../../../../src/app/models/User.js'
import createLocalizedText from '../../../../factories/LocalizedTextFactory.js'
import createPlace from '../../../../factories/PlaceFactory.js'
import createRoomBathroom from '../../../../factories/Room/BathroomFactory.js'
import createRoomBedroom from '../../../../factories/Room/BedroomFactory.js'
import createRoomDen from '../../../../factories/Room/DenFactory.js'
import createRoomKitchen from '../../../../factories/Room/KitchenFactory.js'
import createRoomLivingRoom from '../../../../factories/Room/LivingRoomFactory.js'
import createUser from '../../../../factories/UserFactory.js'
import { session, SpecRequestType } from '../../../helpers/authentication.js'

describe('V1/Guest/PlacesController', () => {
  let request: SpecRequestType
  let user: User

  beforeEach(async () => {
    user = await createUser()
    request = await session(user)
  })

  describe('GET index', () => {
    const subject = async <StatusCode extends 200 | 400>(expectedStatus: StatusCode) => {
      return request.get('/v1/guest/places', expectedStatus, {
        headers: {
          'content-language': 'es-ES',
        },
      })
    }

    it('returns the index of Places', async () => {
      const place = await createPlace()
      await createLocalizedText({ localizable: place, locale: 'es-ES', title: 'The Spanish title' })

      const { body } = await subject(200)

      expect(body).toEqual({
        currentPage: 1,
        pageCount: 1,
        recordCount: 1,
        results: [
          {
            id: place.id,
            title: 'The Spanish title',
          },
        ],
      })
    })
  })

  describe('GET show', () => {
    const subject = async <StatusCode extends 200 | 400>(place: Place, expectedStatus: StatusCode) => {
      return request.get('/v1/guest/places/{id}', expectedStatus, {
        id: place.id,
        headers: {
          'content-language': 'es-ES',
        },
      })
    }

    it('returns places with rooms', async () => {
      const place = await createPlace({ style: 'cabin', sleeps: 3 })
      await createLocalizedText({ localizable: place, locale: 'es-ES', title: 'The Spanish place title' })

      const { kitchen, bathroom, bedroom, den, livingRoom } = await createRoomsForPlace(place)

      const { body } = await subject(place, 200)

      expect(body).toEqual({
        id: place.id,
        sleeps: 3,
        title: 'The Spanish place title',
        style: 'cabin',
        displayStyle: 'cabaña rústica',

        rooms: [
          {
            id: kitchen.id,
            type: 'Kitchen',
            displayType: 'cocina',
            title: 'The Spanish kitchen title',
            appliances: [
              {
                value: 'oven',
                label: 'horno',
              },
              {
                value: 'dishwasher',
                label: 'lavavajillas',
              },
            ],
          },
          {
            id: bathroom.id,
            type: 'Bathroom',
            displayType: 'baño',
            title: 'The Spanish bathroom title',
            bathOrShowerType: 'ducha',
          },
          {
            id: bedroom.id,
            type: 'Bedroom',
            displayType: 'dormitorio',
            title: 'The Spanish bedroom title',
            bedTypes: [
              {
                value: 'cot',
                label: 'catre',
              },
              {
                value: 'bunk',
                label: 'litera',
              },
            ],
          },
          { id: den.id, type: 'Den', displayType: 'estudio', title: 'The Spanish den title' },
          {
            id: livingRoom.id,
            type: 'LivingRoom',
            displayType: 'sala de estar',
            title: 'The Spanish livingRoom title',
          },
        ],
      })
    })
  })
})

async function createRoomsForPlace(place: Place) {
  const kitchen = await createRoomKitchen({ place, appliances: ['oven', 'dishwasher'] })
  await createLocalizedText({ localizable: kitchen, locale: 'es-ES', title: 'The Spanish kitchen title' })

  const bathroom = await createRoomBathroom({ place, bathOrShowerType: 'shower' })
  await createLocalizedText({
    localizable: bathroom,
    locale: 'es-ES',
    title: 'The Spanish bathroom title',
  })

  const bedroom = await createRoomBedroom({ place, bedTypes: ['cot', 'bunk'] })
  await createLocalizedText({ localizable: bedroom, locale: 'es-ES', title: 'The Spanish bedroom title' })

  const den = await createRoomDen({ place })
  await createLocalizedText({ localizable: den, locale: 'es-ES', title: 'The Spanish den title' })

  const livingRoom = await createRoomLivingRoom({ place })
  await createLocalizedText({
    localizable: livingRoom,
    locale: 'es-ES',
    title: 'The Spanish livingRoom title',
  })

  return { kitchen, bathroom, bedroom, den, livingRoom }
}
