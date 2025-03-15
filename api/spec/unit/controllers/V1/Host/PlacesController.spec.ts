/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UpdateableProperties } from '@rvoh/dream'
import { PsychicServer } from '@rvoh/psychic'
import { specRequest as request } from '@rvoh/psychic-spec-helpers'
import Place from '../../../../../src/app/models/Place.js'
import User from '../../../../../src/app/models/User.js'
import createPlace from '../../../../factories/PlaceFactory.js'
import createUser from '../../../../factories/UserFactory.js'
import { addEndUserAuthHeader } from '../../../helpers/authentication.js'

describe('V1/Host/PlacesController', () => {
  let user: User

  beforeEach(async () => {
    await request.init(PsychicServer)
    user = await createUser()
  })

  describe('GET index', () => {
    function subject(expectedStatus: number = 200) {
      return request.get('/v1/host/places', expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the index of Places', async () => {
      const place = await createPlace({
        user
      })
      const results = (await subject()).body

      expect(results).toEqual([
        expect.objectContaining({
          id: place.id,
        }),
      ])
    })

    context('Places created by another User', () => {
      it('are omitted', async () => {
        await createPlace()
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
      const place = await createPlace({
        user
      })
      const results = (await subject(place)).body

      expect(results).toEqual(
        expect.objectContaining({
          id: place.id,
        }),
      )
    })

    context('Place created by another User', () => {
      it('is not found', async () => {
        const otherUserPlace = await createPlace()
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

    it('creates a Place for this User', async () => {
      const results = (await subject({
        
      })).body
      const place = await Place.findOrFailBy({ userId: user.id })

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
      const place = await createPlace({
        user
      })
      await subject(place, {
        
      })

      await place.reload()
      
    })

    context('a Place created by another User', () => {
      it('is not updated', async () => {
        const place = await createPlace({
          
        })
        await subject(place, {
          
        }, 404)

        await place.reload()
        
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
      const place = await createPlace({ user })
      await subject(place)

      expect(await Place.find(place.id)).toBeNull()
    })

    context('a Place created by another User', () => {
      it('is not deleted', async () => {
        const place = await createPlace()
        await subject(place, 404)

        expect(await Place.find(place.id)).toMatchDreamModel(place)
      })
    })
  })
})
