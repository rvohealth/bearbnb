import Room from '@models/Room.js'
import User from '@models/User.js'
import Place from '@models/Place.js'
import createRoom from '@spec/factories/RoomFactory.js'
import createUser from '@spec/factories/UserFactory.js'
import createPlace from '@spec/factories/PlaceFactory.js'
import { RequestBody, session, SpecRequestType } from '@spec/unit/helpers/authentication.js'

describe('V1/Host/Places/RoomsController', () => {
  let request: SpecRequestType
  let user: User
  let place: Place

  beforeEach(async () => {
    user = await createUser()
    place = await createPlace({ user })
    request = await session(user)
  })

  describe('GET index', () => {
    const subject = async <StatusCode extends 200 | 400 | 404>(expectedStatus: StatusCode) => {
      return request.get('/v1/host/places/rooms', expectedStatus)
    }

    it('returns the index of Rooms', async () => {
      const room = await createRoom({ place })

      const { body } = await subject(200)

      expect(body.results).toEqual([
        expect.objectContaining({
          id: room.id,
        }),
      ])
    })

    context('Rooms created by another Place', () => {
      it('are omitted', async () => {
        await createRoom()

        const { body } = await subject(200)

        expect(body.results).toEqual([])
      })
    })
  })

  describe('GET show', () => {
    const subject = async <StatusCode extends 200 | 400 | 404>(room: Room, expectedStatus: StatusCode) => {
      return request.get('/v1/host/places/rooms/{id}', expectedStatus, {
        id: room.id,
      })
    }

    it('returns the specified Room', async () => {
      const room = await createRoom({ place })

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
        const otherPlaceRoom = await createRoom()

        await subject(otherPlaceRoom, 404)
      })
    })
  })

  describe('POST create', () => {
    const subject = async <StatusCode extends 201 | 400 | 404>(
      data: RequestBody<'post', '/v1/host/places/rooms'>,
      expectedStatus: StatusCode
    ) => {
      return request.post('/v1/host/places/rooms', expectedStatus, { data })
    }

    it('creates a Room for this Place', async () => {
      const { body } = await subject({
        type: 'Bathroom',
        position: 1,
      }, 201)

      const room = await place.associationQuery('rooms').firstOrFail()
      expect(room.type).toEqual('Bathroom')
      expect(room.position).toEqual(1)

      expect(body).toEqual(
        expect.objectContaining({
          id: room.id,
          type: room.type,
          position: room.position,
        }),
      )
    })
  })

  describe('PATCH update', () => {
    const subject = async <StatusCode extends 204 | 400 | 404>(
      room: Room,
      data: RequestBody<'patch', '/v1/host/places/rooms/{id}'>,
      expectedStatus: StatusCode
    ) => {
      return request.patch('/v1/host/places/rooms/{id}', expectedStatus, {
        id: room.id,
        data,
      })
    }

    it('updates the Room', async () => {
      const room = await createRoom({ place })

      await subject(room, {
        type: 'LivingRoom',
        position: 2,
      }, 204)

      await room.reload()
      expect(room.type).toEqual('LivingRoom')
      expect(room.position).toEqual(2)
    })

    context('a Room created by another Place', () => {
      it('is not updated', async () => {
        const room = await createRoom()
        const originalType = room.type
        const originalPosition = room.position

        await subject(room, {
          type: 'LivingRoom',
          position: 2,
        }, 404)

        await room.reload()
        expect(room.type).toEqual(originalType)
        expect(room.position).toEqual(originalPosition)
      })
    })
  })

  describe('DELETE destroy', () => {
    const subject = async <StatusCode extends 204 | 400 | 404>(room: Room, expectedStatus: StatusCode) => {
      return request.delete('/v1/host/places/rooms/{id}', expectedStatus, {
        id: room.id,
      })
    }

    it('deletes the Room', async () => {
      const room = await createRoom({ place })

      await subject(room, 204)

      expect(await Room.find(room.id)).toBeNull()
    })

    context('a Room created by another Place', () => {
      it('is not deleted', async () => {
        const room = await createRoom()

        await subject(room, 404)

        expect(await Room.find(room.id)).toMatchDreamModel(room)
      })
    })
  })
})
