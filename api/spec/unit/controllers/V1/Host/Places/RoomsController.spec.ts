import { UpdateableProperties } from '@rvoh/dream'
import Place from '../../../../../../src/app/models/Place.js'
import Room from '../../../../../../src/app/models/Room.js'
import Bathroom from '../../../../../../src/app/models/Room/Bathroom.js'
import User from '../../../../../../src/app/models/User.js'
import createHost from '../../../../../factories/HostFactory.js'
import createHostPlace from '../../../../../factories/HostPlaceFactory.js'
import createPlace from '../../../../../factories/PlaceFactory.js'
import createRoomBathroom from '../../../../../factories/Room/BathroomFactory.js'
import createUser from '../../../../../factories/UserFactory.js'
import { session, SpecRequestType } from '../../../../helpers/authentication.js'

describe('V1/Host/Places/RoomsController', () => {
  let request: SpecRequestType
  let user: User
  let place: Place

  beforeEach(async () => {
    user = await createUser()
    const host = await createHost({ user })
    place = await createPlace()
    await createHostPlace({ host, place })
    request = await session(user)
  })

  describe('GET index', () => {
    const subject = async <StatusCode extends 200 | 400>(expectedStatus: StatusCode) => {
      return request.get('/v1/host/places/{placeId}/rooms', expectedStatus, {
        placeId: place.id,
      })
    }

    it('returns the index of Rooms', async () => {
      const room = await createRoomBathroom({ place })

      const { body } = await subject(200)

      expect(body).toEqual([
        expect.objectContaining({
          id: room.id,
          type: room.type,
        }),
      ])
    })

    context('Rooms created by another Place', () => {
      it('are omitted', async () => {
        await createRoomBathroom()

        const { body } = await subject(200)

        expect(body).toEqual([])
      })
    })
  })

  describe('GET show', () => {
    const subject = async <StatusCode extends 200 | 400 | 404>(room: Room, expectedStatus: StatusCode) => {
      return request.get('/v1/host/places/{placeId}/rooms/{id}', expectedStatus, {
        placeId: place.id,
        id: room.id,
      })
    }

    it('returns the specified Room', async () => {
      const room = await createRoomBathroom({ place })

      const { body } = await subject(room, 200)

      expect(body).toEqual(
        expect.objectContaining({
          id: room.id,
          type: room.type,
          position: room.position,
        }),
      )
    })

    context('Room created by another Place', () => {
      it('is not found', async () => {
        const otherPlaceRoom = await createRoomBathroom()

        await subject(otherPlaceRoom, 404)
      })
    })
  })

  describe('POST create', () => {
    const subject = async <StatusCode extends 201 | 400>(
      data: UpdateableProperties<Room>,
      expectedStatus: StatusCode,
    ) => {
      return request.post('/v1/host/places/{placeId}/rooms', expectedStatus, {
        placeId: place.id,
        data,
      })
    }

    it('creates a Room for this Place', async () => {
      const { body } = await subject(
        {
          type: 'Bathroom',
          bathOrShowerType: 'bath_and_shower',
        },
        201,
      )

      const room: Bathroom = (await place.associationQuery('rooms').firstOrFail()) as Bathroom
      expect(room.bathOrShowerType).toEqual('bath_and_shower')

      expect(body).toEqual(
        expect.objectContaining({
          id: room.id,
          bathOrShowerType: room.bathOrShowerType,
        }),
      )
    })
  })

  describe('PATCH update', () => {
    const subject = async <StatusCode extends 204 | 400 | 404>(
      room: Room,
      data: UpdateableProperties<Room>,
      expectedStatus: StatusCode,
    ) => {
      return request.patch('/v1/host/places/{placeId}/rooms/{id}', expectedStatus, {
        placeId: place.id,
        id: room.id,
        data,
      })
    }

    it('updates the Room', async () => {
      const room = await createRoomBathroom({ place })

      await subject(
        room,
        {
          bathOrShowerType: 'bath_and_shower',
        },
        204,
      )

      await room.reload()
      expect(room.bathOrShowerType).toEqual('bath_and_shower')
    })

    context('a Room created by another Place', () => {
      it('is not updated', async () => {
        const room = await createRoomBathroom()
        const originalBathOrShowerType = room.bathOrShowerType

        await subject(
          room,
          {
            position: 2,
            bathOrShowerType: 'none',
          },
          404,
        )

        await room.reload()
        expect(room.bathOrShowerType).toEqual(originalBathOrShowerType)
      })
    })
  })

  describe('DELETE destroy', () => {
    const subject = async <StatusCode extends 204 | 400 | 404>(room: Room, expectedStatus: StatusCode) => {
      return request.delete('/v1/host/places/{placeId}/rooms/{id}', expectedStatus, {
        placeId: place.id,
        id: room.id,
      })
    }

    it('deletes the Room', async () => {
      const room = await createRoomBathroom({ place })

      await subject(room, 204)

      expect(await Room.find(room.id)).toBeNull()
    })

    context('a Room created by another Place', () => {
      it('is not deleted', async () => {
        const room = await createRoomBathroom()

        await subject(room, 404)

        expect(await Room.find(room.id)).toMatchDreamModel(room)
      })
    })
  })
})
