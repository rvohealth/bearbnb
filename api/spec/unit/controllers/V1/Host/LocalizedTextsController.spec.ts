import LocalizedText from '@models/LocalizedText.js'
import User from '@models/User.js'
import createLocalizedText from '@spec/factories/LocalizedTextFactory.js'
import createUser from '@spec/factories/UserFactory.js'
import { RequestBody, session, SpecRequestType } from '@spec/unit/helpers/authentication.js'

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
      data: RequestBody<'patch', '/v1/host/localized-texts/{id}'>,
      expectedStatus: StatusCode
    ) => {
      return request.patch('/v1/host/localized-texts/{id}', expectedStatus, {
        id: localizedText.id,
        data,
      })
    }

    it('updates the LocalizedText', async () => {
      const localizedText = await createLocalizedText({ user })

      await subject(localizedText, {
        locale: 'es-ES',
        title: 'Updated LocalizedText title',
        markdown: 'Updated LocalizedText markdown',
      }, 204)

      await localizedText.reload()
      expect(localizedText.locale).toEqual('es-ES')
      expect(localizedText.title).toEqual('Updated LocalizedText title')
      expect(localizedText.markdown).toEqual('Updated LocalizedText markdown')
    })

    context('a LocalizedText created by another User', () => {
      it('is not updated', async () => {
        const localizedText = await createLocalizedText()
        const originalLocale = localizedText.locale
        const originalTitle = localizedText.title
        const originalMarkdown = localizedText.markdown

        await subject(localizedText, {
          locale: 'es-ES',
          title: 'Updated LocalizedText title',
          markdown: 'Updated LocalizedText markdown',
        }, 404)

        await localizedText.reload()
        expect(localizedText.locale).toEqual(originalLocale)
        expect(localizedText.title).toEqual(originalTitle)
        expect(localizedText.markdown).toEqual(originalMarkdown)
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
