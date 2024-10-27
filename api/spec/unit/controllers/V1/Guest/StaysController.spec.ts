/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe as context } from '@jest/globals'
import { UpdateableProperties } from '@rvohealth/dream'
import { PsychicServer } from '@rvohealth/psychic'
import { specRequest as request } from '@rvohealth/psychic-spec-helpers'
import Stay from '../../../../../src/app/models/Stay'
import User from '../../../../../src/app/models/User'
import createStay from '../../../../factories/StayFactory'
import createUser from '../../../../factories/UserFactory'
import { addEndUserAuthHeader } from '../../../helpers/authentication'

describe('V1/Guest/StaysController', () => {
  let user: User

  beforeEach(async () => {
    await request.init(PsychicServer)
    user = await createUser()
  })

  describe('GET index', () => {
    function subject(expectedStatus: number = 200) {
      return request.get('/v1/guest/stays-controller', expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the index of Stays', async () => {
      const stay = await createStay({
        user
      })
      const results = (await subject()).body

      expect(results).toEqual([
        expect.objectContaining({
          id: stay.id,
        }),
      ])
    })

    context('Stays created by another User', () => {
      it('are omitted', async () => {
        await createStay()
        const results = (await subject()).body

        expect(results).toEqual([])
      })
    })
  })

  describe('GET show', () => {
    function subject(stay: Stay, expectedStatus: number = 200) {
      return request.get(`/v1/guest/stays-controller/${stay.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the specified Stay', async () => {
      const stay = await createStay({
        user
      })
      const results = (await subject(stay)).body

      expect(results).toEqual([
        expect.objectContaining({
          id: stay.id,
        }),
      ])
    })

    context('Stay created by another User', () => {
      it('is not found', async () => {
        const otherUserStay = await createStay()
        await subject(otherUserStay, 404)
      })
    })
  })

  describe('POST create', () => {
    function subject(data: UpdateableProperties<Stay>, expectedStatus: number = 201) {
      return request.post('/v1/guest/stays-controller', expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('creates a Stay for this User', async () => {
      const results = (await subject({
        
      })).body
      const stay = await Stay.findOrFailBy({ userId: user.id })

      expect(results).toEqual([
        expect.objectContaining({
          id: stay.id,
        }),
      ])
    })
  })

  describe('PATCH update', () => {
    function subject(stay: Stay, data: UpdateableProperties<Stay>, expectedStatus: number = 204) {
      return request.patch(`/v1/guest/stays-controller/${stay.id}`, expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('updates the Stay', async () => {
      const stay = await createStay({
        user
      })
      await subject(stay, {
        
      })

      await stay.reload()
      
    })

    context('a Stay created by another User', () => {
      it('is not updated', async () => {
        const stay = await createStay({
          
        })
        await subject(stay, {
          
        }, 404)

        await stay.reload()
        
      })
    })
  })

  describe('DELETE destroy', () => {
    function subject(stay: Stay, expectedStatus: number = 204) {
      return request.delete(`/v1/guest/stays-controller/${stay.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('deletes the Stay', async () => {
      const stay = await createStay({ user })
      await subject(stay)

      expect(await Stay.find(stay.id)).toBeNull()
    })

    context('a Stay created by another User', () => {
      it('is not deleted', async () => {
        const stay = await createStay()
        await subject(stay, 404)

        expect(await Stay.find(stay.id)).toMatchDreamModel(stay)
      })
    })
  })
})
