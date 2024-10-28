/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe as context } from '@jest/globals'
import { UpdateableProperties } from '@rvohealth/dream'
import { PsychicServer } from '@rvohealth/psychic'
import { specRequest as request } from '@rvohealth/psychic-spec-helpers'
import Host from '../../../../../../src/app/models/Host'
import Place from '../../../../../../src/app/models/Place'
import RoomBase from '../../../../../../src/app/models/Room/Base'
import User from '../../../../../../src/app/models/User'
import createHost from '../../../../../factories/HostFactory'
import createHostPlace from '../../../../../factories/HostPlaceFactory'
import createPlace from '../../../../../factories/PlaceFactory'
import createRoomBedroom from '../../../../../factories/Room/BedroomFactory'
import createUser from '../../../../../factories/UserFactory'
import { addEndUserAuthHeader } from '../../../../helpers/authentication'

describe('V1/Host/RoomsController', () => {
  let user: User
  let host: Host
  let place: Place
  let room: RoomBase

  beforeEach(async () => {
    await request.init(PsychicServer)
    user = await createUser()
    host = await createHost({ user })
    place = await createPlace()
    await createHostPlace({ host, place })
  })

  describe('GET index', () => {
    function subject(place: Place, expectedStatus: number = 200) {
      return request.get(`/v1/host/places/${place.id}/rooms`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the index of Rooms', async () => {
      room = await createRoomBedroom({ place })
      const results = (await subject(place)).body

      expect(results).toEqual([
        expect.objectContaining({
          id: room.id,
        }),
      ])
    })

    context('RoomBases created by another User', () => {
      it('are omitted', async () => {
        const otherUserPlace = await createPlace()
        await createRoomBedroom({ place: otherUserPlace })
        const results = (await subject(otherUserPlace)).body

        expect(results).toEqual([])
      })
    })
  })

  describe('GET show', () => {
    function subject(place: Place, room: RoomBase, expectedStatus: number = 200) {
      return request.get(`/v1/host/places/${place.id}/rooms/${room.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the specified Room/Base', async () => {
      room = await createRoomBedroom({ place })
      const results = (await subject(place, room)).body

      expect(results).toEqual(
        expect.objectContaining({
          id: room.id,
        }),
      )
    })

    context('Room/Base created by another User', () => {
      it('is not found', async () => {
        const otherUserPlace = await createPlace()
        const otherUserRoom = await createRoomBedroom({ place: otherUserPlace })
        await subject(otherUserPlace, otherUserRoom, 404)
      })
    })
  })

  describe('POST create', () => {
    function subject(data: UpdateableProperties<RoomBase>, expectedStatus: number = 201) {
      return request.post(`/v1/host/places/${place.id}/rooms`, expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('creates a Room for the specified Place', async () => {
      const results = (
        await subject({
          type: 'Bathroom',
          bathOrShowerType: 'shower',
        })
      ).body
      const room = await place.associationQuery('rooms').firstOrFail()

      expect(results).toEqual(
        expect.objectContaining({
          id: room.id,
          type: 'Bathroom',
          bathOrShowerType: 'shower',
        }),
      )
    })
  })

  // describe('PATCH update', () => {
  //   function subject(roomBase: RoomBase, data: UpdateableProperties<RoomBase>, expectedStatus: number = 204) {
  //     return request.patch(`/v1/host/places/${place.id}/rooms/${roomBase.id}`, expectedStatus, {
  //       data,
  //       headers: addEndUserAuthHeader(request, user, {}),
  //     })
  //   }

  //   it('updates the Room/Base', async () => {
  //     const roomBase = await createRoomBase({
  //       user
  //     })
  //     await subject(roomBase, {

  //     })

  //     await roomBase.reload()

  //   })

  //   context('a Room/Base created by another User', () => {
  //     it('is not updated', async () => {
  //       const roomBase = await createRoomBase({

  //       })
  //       await subject(roomBase, {

  //       }, 404)

  //       await roomBase.reload()

  //     })
  //   })
  // })

  // describe('DELETE destroy', () => {
  //   function subject(roomBase: RoomBase, expectedStatus: number = 204) {
  //     return request.delete(`/v1/host/places/${place.id}/rooms/${roomBase.id}`, expectedStatus, {
  //       headers: addEndUserAuthHeader(request, user, {}),
  //     })
  //   }

  //   it('deletes the Room/Base', async () => {
  //     const roomBase = await createRoomBase({ user })
  //     await subject(roomBase)

  //     expect(await RoomBase.find(roomBase.id)).toBeNull()
  //   })

  //   context('a Room/Base created by another User', () => {
  //     it('is not deleted', async () => {
  //       const roomBase = await createRoomBase()
  //       await subject(roomBase, 404)

  //       expect(await RoomBase.find(roomBase.id)).toMatchDreamModel(roomBase)
  //     })
  //   })
  // })
})
