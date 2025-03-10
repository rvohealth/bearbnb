/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UpdateableProperties } from '@rvohealth/dream'
import { PsychicServer } from '@rvohealth/psychic'
import { specRequest as request } from '@rvohealth/psychic-spec-helpers'
import Room from '../../../../../../src/app/models/Room'
import User from '../../../../../../src/app/models/User'
import createRoom from '../../../../../factories/RoomFactory'
import createUser from '../../../../../factories/UserFactory'
import { addEndUserAuthHeader } from '../../../../helpers/authentication'

describe('V1/Host/Places/RoomsController', () => {
  let user: User

  beforeEach(async () => {
    await request.init(PsychicServer)
    user = await createUser()
  })

  describe('GET index', () => {
    function subject(expectedStatus: number = 200) {
      return request.get('/v1/host/places/rooms', expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the index of Rooms', async () => {
      const room = await createRoom({
        user
      })
      const results = (await subject()).body

      expect(results).toEqual([
        expect.objectContaining({
          id: room.id,
        }),
      ])
    })

    context('Rooms created by another User', () => {
      it('are omitted', async () => {
        await createRoom()
        const results = (await subject()).body

        expect(results).toEqual([])
      })
    })
  })

  describe('GET show', () => {
    function subject(room: Room, expectedStatus: number = 200) {
      return request.get(`/v1/host/places/rooms/${room.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the specified Room', async () => {
      const room = await createRoom({
        user
      })
      const results = (await subject(room)).body

      expect(results).toEqual(
        expect.objectContaining({
          id: room.id,
        }),
      )
    })

    context('Room created by another User', () => {
      it('is not found', async () => {
        const otherUserRoom = await createRoom()
        await subject(otherUserRoom, 404)
      })
    })
  })

  describe('POST create', () => {
    function subject(data: UpdateableProperties<Room>, expectedStatus: number = 201) {
      return request.post('/v1/host/places/rooms', expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('creates a Room for this User', async () => {
      const results = (await subject({
        
      })).body
      const room = await Room.findOrFailBy({ userId: user.id })

      expect(results).toEqual(
        expect.objectContaining({
          id: room.id,
        }),
      )
    })
  })

  describe('PATCH update', () => {
    function subject(room: Room, data: UpdateableProperties<Room>, expectedStatus: number = 204) {
      return request.patch(`/v1/host/places/rooms/${room.id}`, expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('updates the Room', async () => {
      const room = await createRoom({
        user
      })
      await subject(room, {
        
      })

      await room.reload()
      
    })

    context('a Room created by another User', () => {
      it('is not updated', async () => {
        const room = await createRoom({
          
        })
        await subject(room, {
          
        }, 404)

        await room.reload()
        
      })
    })
  })

  describe('DELETE destroy', () => {
    function subject(room: Room, expectedStatus: number = 204) {
      return request.delete(`/v1/host/places/rooms/${room.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('deletes the Room', async () => {
      const room = await createRoom({ user })
      await subject(room)

      expect(await Room.find(room.id)).toBeNull()
    })

    context('a Room created by another User', () => {
      it('is not deleted', async () => {
        const room = await createRoom()
        await subject(room, 404)

        expect(await Room.find(room.id)).toMatchDreamModel(room)
      })
    })
  })
})
