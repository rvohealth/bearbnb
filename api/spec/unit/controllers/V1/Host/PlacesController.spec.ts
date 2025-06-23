import { UpdateableProperties } from '@rvoh/dream'
import Host from '../../../../../src/app/models/Host.js'
import Place from '../../../../../src/app/models/Place.js'
import User from '../../../../../src/app/models/User.js'
import createHost from '../../../../factories/HostFactory.js'
import createHostPlace from '../../../../factories/HostPlaceFactory.js'
import createPlace from '../../../../factories/PlaceFactory.js'
import createUser from '../../../../factories/UserFactory.js'
import { session, SpecRequestType } from '../../../helpers/authentication.js'

describe('V1/Host/PlacesController', () => {
  let request: SpecRequestType
  let user: User
  let host: Host

  beforeEach(async () => {
    user = await createUser()
    host = await createHost({ user })
    request = await session(user)
  })

  describe('GET index', () => {
    const subject = async <StatusCode extends 200 | 400>(expectedStatus: StatusCode) => {
      return request.get('/v1/host/places', expectedStatus)
    }

    it('returns the index of Places', async () => {
      const place = await createPlace()
      await createHostPlace({ host, place })

      const { body } = await subject(200)

      expect(body).toEqual([
        expect.objectContaining({
          id: place.id,
        }),
      ])
    })

    context('Places created by another Host', () => {
      it('are omitted', async () => {
        await createPlace()

        const { body } = await subject(200)

        expect(body).toEqual([])
      })
    })
  })

  describe('GET show', () => {
    const subject = async <StatusCode extends 200 | 400 | 404>(place: Place, expectedStatus: StatusCode) => {
      return request.get('/v1/host/places/{id}', expectedStatus, {
        id: place.id,
      })
    }

    it('returns the specified Place', async () => {
      const place = await createPlace()
      await createHostPlace({ host, place })

      const { body } = await subject(place, 200)

      expect(body).toEqual(
        expect.objectContaining({
          id: place.id,
          name: place.name,
          style: place.style,
          sleeps: place.sleeps,
        }),
      )
    })

    context('Place created by another Host', () => {
      it('is not found', async () => {
        const otherHostPlace = await createPlace()

        await subject(otherHostPlace, 404)
      })
    })
  })

  describe('POST create', () => {
    const subject = async <StatusCode extends 201 | 400>(
      data: UpdateableProperties<Place>,
      expectedStatus: StatusCode,
    ) => {
      return request.post('/v1/host/places', expectedStatus, { data })
    }

    it('creates a Place for this Host', async () => {
      const { body } = await subject(
        {
          name: 'The Place name',
          style: 'cottage',
          sleeps: 1,
        },
        201,
      )

      const place = await host.associationQuery('places').firstOrFail()
      expect(place.name).toEqual('The Place name')
      expect(place.style).toEqual('cottage')
      expect(place.sleeps).toEqual(1)

      expect(body).toEqual(
        expect.objectContaining({
          id: place.id,
          name: place.name,
          style: place.style,
          sleeps: place.sleeps,
        }),
      )
    })
  })

  describe('PATCH update', () => {
    const subject = async <StatusCode extends 204 | 400 | 404>(
      place: Place,
      data: UpdateableProperties<Place>,
      expectedStatus: StatusCode,
    ) => {
      return request.patch('/v1/host/places/{id}', expectedStatus, {
        id: place.id,
        data,
      })
    }

    it('updates the Place', async () => {
      const place = await createPlace()
      await createHostPlace({ host, place })

      await subject(
        place,
        {
          name: 'Updated Place name',
          style: 'dump',
          sleeps: 2,
        },
        204,
      )

      await place.reload()
      expect(place.name).toEqual('Updated Place name')
      expect(place.style).toEqual('dump')
      expect(place.sleeps).toEqual(2)
    })

    context('a Place created by another Host', () => {
      it('is not updated', async () => {
        const place = await createPlace()
        const originalName = place.name
        const originalStyle = place.style
        const originalSleeps = place.sleeps

        await subject(
          place,
          {
            name: 'Updated Place name',
            style: 'dump',
            sleeps: 2,
          },
          404,
        )

        await place.reload()
        expect(place.name).toEqual(originalName)
        expect(place.style).toEqual(originalStyle)
        expect(place.sleeps).toEqual(originalSleeps)
      })
    })
  })

  describe('DELETE destroy', () => {
    const subject = async <StatusCode extends 204 | 400 | 404>(place: Place, expectedStatus: StatusCode) => {
      return request.delete('/v1/host/places/{id}', expectedStatus, {
        id: place.id,
      })
    }

    it('deletes the Place', async () => {
      const place = await createPlace()
      await createHostPlace({ host, place })

      await subject(place, 204)

      expect(await Place.find(place.id)).toBeNull()
    })

    context('a Place created by another Host', () => {
      it('is not deleted', async () => {
        const place = await createPlace()

        await subject(place, 404)

        expect(await Place.find(place.id)).toMatchDreamModel(place)
      })
    })
  })
})
