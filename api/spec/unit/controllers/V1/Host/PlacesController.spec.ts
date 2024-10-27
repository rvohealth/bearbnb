/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe as context } from '@jest/globals'
import { UpdateableProperties } from '@rvohealth/dream'
import { PsychicServer } from '@rvohealth/psychic'
import { specRequest as request } from '@rvohealth/psychic-spec-helpers'
import Host from '../../../../../src/app/models/Host'
import Place from '../../../../../src/app/models/Place'
import User from '../../../../../src/app/models/User'
import createHost from '../../../../factories/HostFactory'
import createHostPlace from '../../../../factories/HostPlaceFactory'
import createPlace from '../../../../factories/PlaceFactory'
import createUser from '../../../../factories/UserFactory'
import { addEndUserAuthHeader } from '../../../helpers/authentication'

describe('V1/Host/PlacesController', () => {
  let user: User
  let host: Host

  beforeEach(async () => {
    await request.init(PsychicServer)
    user = await createUser()
    host = await createHost({ user })
  })

  describe('GET index', () => {
    function subject(expectedStatus: number = 200) {
      return request.get('/v1/host/places', expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the index of Places', async () => {
      const place = await createPlace()
      await createHostPlace({ host, place })
      const results = (await subject()).body

      expect(results).toEqual([
        expect.objectContaining({
          id: place.id,
        }),
      ])
    })

    context('Places created by another Host', () => {
      it('are omitted', async () => {
        const place = await createPlace()
        await createHostPlace({ host: await createHost(), place })
        const results = (await subject()).body

        expect(results).toEqual([])
      })
    })
  })

  describe('GET show', () => {
    function subject(place: Place, expectedStatus: number = 200) {
      return request.get(`/v1/host/places/${place.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the specified Place', async () => {
      const place = await createPlace()
      await createHostPlace({ host, place })
      const results = (await subject(place)).body

      expect(results).toEqual(
        expect.objectContaining({
          id: place.id,
        }),
      )
    })

    context('Place created by another Host', () => {
      it('is not found', async () => {
        const otherUserPlace = await createPlace()
        await createHostPlace({ host: await createHost(), place: otherUserPlace })
        await subject(otherUserPlace, 404)
      })
    })
  })

  describe('POST create', () => {
    function subject(data: UpdateableProperties<Place>, expectedStatus: number = 201) {
      return request.post('/v1/host/places', expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('creates a Place for this Host', async () => {
      const results = (await subject({ name: 'Ruby Lake Cabin', style: 'cabin' })).body
      const place = await host.associationQuery('places').firstOrFail()

      expect(results).toEqual(
        expect.objectContaining({
          id: place.id,
        }),
      )
    })
  })

  describe('PATCH update', () => {
    function subject(place: Place, data: UpdateableProperties<Place>, expectedStatus: number = 204) {
      return request.patch(`/v1/host/places/${place.id}`, expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('updates the Place', async () => {
      const place = await createPlace()
      await createHostPlace({ host, place })

      await subject(place, {
        name: 'Modified name',
      })

      await place.reload()
      expect(place.name).toEqual('Modified name')
    })

    context('a Place created by another User', () => {
      it('is not updated', async () => {
        const otherUserPlace = await createPlace()
        const originalName = otherUserPlace.name
        await createHostPlace({ host: await createHost(), place: otherUserPlace })
        await subject(
          otherUserPlace,
          {
            name: 'Modified name',
          },
          404,
        )

        await otherUserPlace.reload()
        expect(otherUserPlace.name).toEqual(originalName)
      })
    })
  })

  describe('DELETE destroy', () => {
    function subject(place: Place, expectedStatus: number = 204) {
      return request.delete(`/v1/host/places/${place.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('deletes the Place', async () => {
      const place = await createPlace()
      await createHostPlace({ host, place })

      await subject(place)

      expect(await Place.find(place.id)).toBeNull()
      expect(await Place.where({ id: place.id }).count()).toEqual(0)

      expect(await Place.removeAllDefaultScopes().find(place.id)).toMatchDreamModel(place)
      expect(await Place.removeAllDefaultScopes().where({ id: place.id }).count()).toEqual(1)
    })

    context('a Place created by another User', () => {
      it('is not deleted', async () => {
        const otherUserPlace = await createPlace()
        await createHostPlace({ host: await createHost(), place: otherUserPlace })
        await subject(otherUserPlace, 404)

        expect(await Place.find(otherUserPlace.id)).toMatchDreamModel(otherUserPlace)
      })
    })
  })
})
