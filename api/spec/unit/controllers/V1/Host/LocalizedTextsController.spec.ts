import { UpdateableProperties, DateTime } from '@rvoh/dream'
import LocalizedText from '../../../../../src/app/models/LocalizedText.js'
import User from '../../../../../src/app/models/User.js'
import createLocalizedText from '../../../../factories/LocalizedTextFactory.js'
import createUser from '../../../../factories/UserFactory.js'
import { session, SpecRequestType } from '../../../helpers/authentication.js'

describe('V1/Host/LocalizedTextsController', () => {
  let request: SpecRequestType
  let user: User

  beforeEach(async () => {
    user = await createUser()
    request = await session(user)
  })

  describe('PATCH update', () => {
    const subject = async <StatusCode extends 204 | 400 | 404>(
      localizedText: LocalizedText,
      data: UpdateableProperties<LocalizedText>,
      expectedStatus: StatusCode
    ) => {
      return request.patch('/v1/host/localized-texts/{id}', expectedStatus, {
        id: localizedText.id,
        data,
      })
    }

    it('updates the LocalizedText', async () => {
      const lastHour = DateTime.now().minus({ hour: 1 })

      const localizedText = await createLocalizedText({ user })

      await subject(localizedText, {
        locale: 'es-ES',
        title: 'Updated LocalizedText title',
        markdown: 'Updated LocalizedText markdown',
        deletedAt: lastHour,
      }, 204)

      await localizedText.reload()
      expect(localizedText.locale).toEqual('es-ES')
      expect(localizedText.title).toEqual('Updated LocalizedText title')
      expect(localizedText.markdown).toEqual('Updated LocalizedText markdown')
      expect(localizedText.deletedAt).toEqualDateTime(lastHour)
    })

    context('a LocalizedText created by another User', () => {
      it('is not updated', async () => {
        const localizedText = await createLocalizedText()
        const originalLocale = localizedText.locale
        const originalTitle = localizedText.title
        const originalMarkdown = localizedText.markdown
        const originalDeletedAt = localizedText.deletedAt

        await subject(localizedText, {
          locale: 'es-ES',
          title: 'Updated LocalizedText title',
          markdown: 'Updated LocalizedText markdown',
          deletedAt: lastHour,
        }, 404)

        await localizedText.reload()
        expect(localizedText.locale).toEqual(originalLocale)
        expect(localizedText.title).toEqual(originalTitle)
        expect(localizedText.markdown).toEqual(originalMarkdown)
        expect(localizedText.deletedAt).toEqual(originalDeletedAt)
      })
    })
  })

  describe('DELETE destroy', () => {
    const subject = async <StatusCode extends 204 | 400 | 404>(localizedText: LocalizedText, expectedStatus: StatusCode) => {
      return request.delete('/v1/host/localized-texts/{id}', expectedStatus, {
        id: localizedText.id,
      })
    }

    it('deletes the LocalizedText', async () => {
      const localizedText = await createLocalizedText({ user })

      await subject(localizedText, 204)

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
