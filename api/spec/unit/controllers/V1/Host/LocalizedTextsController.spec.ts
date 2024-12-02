/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe as context } from '@jest/globals'
import { UpdateableProperties } from '@rvohealth/dream'
import { PsychicServer } from '@rvohealth/psychic'
import { specRequest as request } from '@rvohealth/psychic-spec-helpers'
import LocalizedText from '../../../../../src/app/models/LocalizedText'
import User from '../../../../../src/app/models/User'
import createLocalizedText from '../../../../factories/LocalizedTextFactory'
import createUser from '../../../../factories/UserFactory'
import { addEndUserAuthHeader } from '../../../helpers/authentication'

describe('V1/Host/LocalizedTextsController', () => {
  let user: User

  beforeEach(async () => {
    await request.init(PsychicServer)
    user = await createUser()
  })

  describe('GET index', () => {
    function subject(expectedStatus: number = 200) {
      return request.get('/v1/host/localized-texts', expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the index of LocalizedTexts', async () => {
      const localizedText = await createLocalizedText({
        user,
        title: 'The LocalizedText title',,
        markdown: 'The LocalizedText markdown',
      })
      const results = (await subject()).body

      expect(results).toEqual([
        expect.objectContaining({
          id: localizedText.id,
        }),
      ])
    })

    context('LocalizedTexts created by another User', () => {
      it('are omitted', async () => {
        await createLocalizedText()
        const results = (await subject()).body

        expect(results).toEqual([])
      })
    })
  })

  describe('GET show', () => {
    function subject(localizedText: LocalizedText, expectedStatus: number = 200) {
      return request.get(`/v1/host/localized-texts/${localizedText.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('returns the specified LocalizedText', async () => {
      const localizedText = await createLocalizedText({
        user,
        title: 'The LocalizedText title',,
        markdown: 'The LocalizedText markdown',
      })
      const results = (await subject(localizedText)).body

      expect(results).toEqual(
        expect.objectContaining({
          id: localizedText.id,
          title: 'The LocalizedText title',
          markdown: 'The LocalizedText markdown',
        }),
      )
    })

    context('LocalizedText created by another User', () => {
      it('is not found', async () => {
        const otherUserLocalizedText = await createLocalizedText()
        await subject(otherUserLocalizedText, 404)
      })
    })
  })

  describe('POST create', () => {
    function subject(data: UpdateableProperties<LocalizedText>, expectedStatus: number = 201) {
      return request.post('/v1/host/localized-texts', expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('creates a LocalizedText for this User', async () => {
      const results = (await subject({
        title: 'The LocalizedText title',,
        markdown: 'The LocalizedText markdown',
      })).body
      const localizedText = await LocalizedText.findOrFailBy({ userId: user.id })

      expect(results).toEqual(
        expect.objectContaining({
          id: localizedText.id,
          title: 'The LocalizedText title',
          markdown: 'The LocalizedText markdown',
        }),
      )
    })
  })

  describe('PATCH update', () => {
    function subject(localizedText: LocalizedText, data: UpdateableProperties<LocalizedText>, expectedStatus: number = 204) {
      return request.patch(`/v1/host/localized-texts/${localizedText.id}`, expectedStatus, {
        data,
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('updates the LocalizedText', async () => {
      const localizedText = await createLocalizedText({
        user,
        title: 'The LocalizedText title',,
        markdown: 'The LocalizedText markdown',
      })
      await subject(localizedText, {
        title: 'Updated LocalizedText title',,
        markdown: 'Updated LocalizedText markdown',
      })

      await localizedText.reload()
      expect(localizedText.title).toEqual('Updated LocalizedText title')
      expect(localizedText.markdown).toEqual('Updated LocalizedText markdown')
    })

    context('a LocalizedText created by another User', () => {
      it('is not updated', async () => {
        const localizedText = await createLocalizedText({
          title: 'The LocalizedText title',,
          markdown: 'The LocalizedText markdown',
        })
        await subject(localizedText, {
          title: 'Updated LocalizedText title',,
          markdown: 'Updated LocalizedText markdown',
        }, 404)

        await localizedText.reload()
        expect(localizedText.title).toEqual('The LocalizedText title')
        expect(localizedText.markdown).toEqual('The LocalizedText markdown')
      })
    })
  })

  describe('DELETE destroy', () => {
    function subject(localizedText: LocalizedText, expectedStatus: number = 204) {
      return request.delete(`/v1/host/localized-texts/${localizedText.id}`, expectedStatus, {
        headers: addEndUserAuthHeader(request, user, {}),
      })
    }

    it('deletes the LocalizedText', async () => {
      const localizedText = await createLocalizedText({ user })
      await subject(localizedText)

      expect(await LocalizedText.find(localizedText.id)).toBeNull()
    })

    context('a LocalizedText created by another User', () => {
      it('is not deleted', async () => {
        const localizedText = await createLocalizedText()
        await subject(localizedText, 404)

        expect(await LocalizedText.find(localizedText.id)).toMatchDreamModel(localizedText)
      })
    })
  })
})
