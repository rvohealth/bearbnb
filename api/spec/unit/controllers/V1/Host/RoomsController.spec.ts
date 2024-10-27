/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe as context } from '@jest/globals'
import { UpdateableProperties } from '@rvohealth/dream'
import { PsychicServer } from '@rvohealth/psychic'
import { specRequest as request } from '@rvohealth/psychic-spec-helpers'
import RoomBase from '../../../../../src/app/models/Room/Base'
import User from '../../../../../src/app/models/User'
import createRoomBase from '../../../../factories/Room/BaseFactory'
import createUser from '../../../../factories/UserFactory'
import { addEndUserAuthHeader } from '../../../helpers/authentication'

describe('V1/Host/RoomsController', () => {
  let user: User

  beforeEach(async () => {
    await request.init(PsychicServer)
    user = await createUser()
  })

  describe('GET index', () => {
    function subject(expectedStatus: number = 200) {
      return request.get('/v1/host/rooms', expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the index of Room/Bases', async () => {
      const roomBase = await createRoomBase({
        user
      })
      const results = (await subject()).body

      expect(results).toEqual([
        expect.objectContaining({
          id: roomBase.id,
        }),
      ])
    })

    context('RoomBases created by another User', () => {
      it('are omitted', async () => {
        await createRoomBase()
        const results = (await subject()).body

        expect(results).toEqual([])
      })
    })
  })

  describe('GET show', () => {
    function subject(roomBase: RoomBase, expectedStatus: number = 200) {
      return request.get(`/v1/host/rooms/${roomBase.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the specified Room/Base', async () => {
      const roomBase = await createRoomBase({
        user
      })
      const results = (await subject(roomBase)).body

      expect(results).toEqual(
        expect.objectContaining({
          id: roomBase.id,
        }),
      )
    })

    context('Room/Base created by another User', () => {
      it('is not found', async () => {
        const otherUserRoomBase = await createRoomBase()
        await subject(otherUserRoomBase, 404)
      })
    })
  })

  describe('POST create', () => {
    function subject(data: UpdateableProperties<RoomBase>, expectedStatus: number = 201) {
      return request.post('/v1/host/rooms', expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('creates a Room/Base for this User', async () => {
      const results = (await subject({
        
      })).body
      const roomBase = await RoomBase.findOrFailBy({ userId: user.id })

      expect(results).toEqual(
        expect.objectContaining({
          id: roomBase.id,
        }),
      )
    })
  })

  describe('PATCH update', () => {
    function subject(roomBase: RoomBase, data: UpdateableProperties<RoomBase>, expectedStatus: number = 204) {
      return request.patch(`/v1/host/rooms/${roomBase.id}`, expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('updates the Room/Base', async () => {
      const roomBase = await createRoomBase({
        user
      })
      await subject(roomBase, {
        
      })

      await roomBase.reload()
      
    })

    context('a Room/Base created by another User', () => {
      it('is not updated', async () => {
        const roomBase = await createRoomBase({
          
        })
        await subject(roomBase, {
          
        }, 404)

        await roomBase.reload()
        
      })
    })
  })

  describe('DELETE destroy', () => {
    function subject(roomBase: RoomBase, expectedStatus: number = 204) {
      return request.delete(`/v1/host/rooms/${roomBase.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('deletes the Room/Base', async () => {
      const roomBase = await createRoomBase({ user })
      await subject(roomBase)

      expect(await RoomBase.find(roomBase.id)).toBeNull()
    })

    context('a Room/Base created by another User', () => {
      it('is not deleted', async () => {
        const roomBase = await createRoomBase()
        await subject(roomBase, 404)

        expect(await RoomBase.find(roomBase.id)).toMatchDreamModel(roomBase)
      })
    })
  })
})
