import LocalizedText from '@models/LocalizedText.js'
import User from '@models/User.js'
import createHost from '@spec/factories/HostFactory.js'
import createHostPlace from '@spec/factories/HostPlaceFactory.js'
import createPlace from '@spec/factories/PlaceFactory.js'
import createRoomDen from '@spec/factories/Room/DenFactory.js'
import createUser from '@spec/factories/UserFactory.js'
import { RequestBody, session, SpecRequestType } from '@spec/unit/helpers/authentication.js'

describe('V1/Host/LocalizedTextsController', () => {
  let request: SpecRequestType
  let user: User

  beforeEach(async () => {
    user = await createUser()
    request = await session(user)
  })

  context('belonging to a Host', () => {
    let localizedText: LocalizedText

    beforeEach(async () => {
      const host = await createHost({ user })
      localizedText = await host.associationQuery('localizedTexts').firstOrFail()
    })

    describe('PATCH update', () => {
      const updateLocalizedText = async <StatusCode extends 204 | 400 | 404>(
        localizedText: LocalizedText,
        data: RequestBody<'patch', '/v1/host/localized-texts/{id}'>,
        expectedStatus: StatusCode,
      ) => {
        return request.patch('/v1/host/localized-texts/{id}', expectedStatus, {
          id: localizedText.id,
          data,
        })
      }

      it('updates the LocalizedText', async () => {
        await updateLocalizedText(
          localizedText,
          {
            locale: 'es-ES',
            title: 'Updated LocalizedText title',
            markdown: 'Updated LocalizedText markdown',
          },
          204,
        )

        await localizedText.reload()
        expect(localizedText.locale).toEqual('es-ES')
        expect(localizedText.title).toEqual('Updated LocalizedText title')
        expect(localizedText.markdown).toEqual('Updated LocalizedText markdown')
      })

      context('a LocalizedText created by another Host', () => {
        it('is not updated', async () => {
          const otherHost = await createHost()
          localizedText = await otherHost.associationQuery('localizedTexts').firstOrFail()
          const originalLocale = localizedText.locale
          const originalTitle = localizedText.title
          const originalMarkdown = localizedText.markdown

          await updateLocalizedText(
            localizedText,
            {
              locale: 'es-ES',
              title: 'Updated LocalizedText title',
              markdown: 'Updated LocalizedText markdown',
            },
            404,
          )

          await localizedText.reload()
          expect(localizedText.locale).toEqual(originalLocale)
          expect(localizedText.title).toEqual(originalTitle)
          expect(localizedText.markdown).toEqual(originalMarkdown)
        })
      })
    })

    describe('DELETE destroy', () => {
      const destroyLocalizedText = async <StatusCode extends 204 | 400 | 404>(
        localizedText: LocalizedText,
        expectedStatus: StatusCode,
      ) => {
        return request.delete('/v1/host/localized-texts/{id}', expectedStatus, {
          id: localizedText.id,
        })
      }

      it('deletes the LocalizedText', async () => {
        await destroyLocalizedText(localizedText, 204)

        expect(await LocalizedText.find(localizedText.id)).toBeNull()
      })

      context('a LocalizedText created by another Host', () => {
        it('is not deleted', async () => {
          const otherHost = await createHost()
          localizedText = await otherHost.associationQuery('localizedTexts').firstOrFail()

          await destroyLocalizedText(localizedText, 404)

          expect(await LocalizedText.find(localizedText.id)).toMatchDreamModel(localizedText)
        })
      })
    })
  })

  context('belonging to a Place', () => {
    let localizedText: LocalizedText

    beforeEach(async () => {
      const host = await createHost({ user })
      const place = await createPlace()
      await createHostPlace({ host, place })
      localizedText = await place.associationQuery('localizedTexts').firstOrFail()
    })

    describe('PATCH update', () => {
      const updateLocalizedText = async <StatusCode extends 204 | 400 | 404>(
        localizedText: LocalizedText,
        data: RequestBody<'patch', '/v1/host/localized-texts/{id}'>,
        expectedStatus: StatusCode,
      ) => {
        return request.patch('/v1/host/localized-texts/{id}', expectedStatus, {
          id: localizedText.id,
          data,
        })
      }

      it('updates the LocalizedText', async () => {
        await updateLocalizedText(
          localizedText,
          {
            locale: 'es-ES',
            title: 'Updated LocalizedText title',
            markdown: 'Updated LocalizedText markdown',
          },
          204,
        )

        await localizedText.reload()
        expect(localizedText.locale).toEqual('es-ES')
        expect(localizedText.title).toEqual('Updated LocalizedText title')
        expect(localizedText.markdown).toEqual('Updated LocalizedText markdown')
      })

      context('a LocalizedText associated with a Place belonging to a different Host', () => {
        it('is not updated', async () => {
          const otherPlace = await createPlace()
          localizedText = await otherPlace.associationQuery('localizedTexts').firstOrFail()
          const originalLocale = localizedText.locale
          const originalTitle = localizedText.title
          const originalMarkdown = localizedText.markdown

          await updateLocalizedText(
            localizedText,
            {
              locale: 'es-ES',
              title: 'Updated LocalizedText title',
              markdown: 'Updated LocalizedText markdown',
            },
            404,
          )

          await localizedText.reload()
          expect(localizedText.locale).toEqual(originalLocale)
          expect(localizedText.title).toEqual(originalTitle)
          expect(localizedText.markdown).toEqual(originalMarkdown)
        })
      })
    })

    describe('DELETE destroy', () => {
      const destroyLocalizedText = async <StatusCode extends 204 | 400 | 404>(
        localizedText: LocalizedText,
        expectedStatus: StatusCode,
      ) => {
        return request.delete('/v1/host/localized-texts/{id}', expectedStatus, {
          id: localizedText.id,
        })
      }

      it('deletes the LocalizedText', async () => {
        await destroyLocalizedText(localizedText, 204)

        expect(await LocalizedText.find(localizedText.id)).toBeNull()
      })

      context('a LocalizedText associated with a Place belonging to a different Host', () => {
        it('is not deleted', async () => {
          const otherPlace = await createPlace()
          localizedText = await otherPlace.associationQuery('localizedTexts').firstOrFail()

          await destroyLocalizedText(localizedText, 404)

          expect(await LocalizedText.find(localizedText.id)).toMatchDreamModel(localizedText)
        })
      })
    })
  })

  context('belonging to a Room', () => {
    let localizedText: LocalizedText

    beforeEach(async () => {
      const host = await createHost({ user })
      const place = await createPlace()
      await createHostPlace({ host, place })
      const room = await createRoomDen({ place })
      localizedText = await room.associationQuery('localizedTexts').firstOrFail()
    })

    describe('PATCH update', () => {
      const updateLocalizedText = async <StatusCode extends 204 | 400 | 404>(
        localizedText: LocalizedText,
        data: RequestBody<'patch', '/v1/host/localized-texts/{id}'>,
        expectedStatus: StatusCode,
      ) => {
        return request.patch('/v1/host/localized-texts/{id}', expectedStatus, {
          id: localizedText.id,
          data,
        })
      }

      it('updates the LocalizedText', async () => {
        await updateLocalizedText(
          localizedText,
          {
            locale: 'es-ES',
            title: 'Updated LocalizedText title',
            markdown: 'Updated LocalizedText markdown',
          },
          204,
        )

        await localizedText.reload()
        expect(localizedText.locale).toEqual('es-ES')
        expect(localizedText.title).toEqual('Updated LocalizedText title')
        expect(localizedText.markdown).toEqual('Updated LocalizedText markdown')
      })

      context('a LocalizedText associated with a Room belonging to a different Host', () => {
        it('is not updated', async () => {
          const otherRoom = await createRoomDen()
          localizedText = await otherRoom.associationQuery('localizedTexts').firstOrFail()
          const originalLocale = localizedText.locale
          const originalTitle = localizedText.title
          const originalMarkdown = localizedText.markdown

          await updateLocalizedText(
            localizedText,
            {
              locale: 'es-ES',
              title: 'Updated LocalizedText title',
              markdown: 'Updated LocalizedText markdown',
            },
            404,
          )

          await localizedText.reload()
          expect(localizedText.locale).toEqual(originalLocale)
          expect(localizedText.title).toEqual(originalTitle)
          expect(localizedText.markdown).toEqual(originalMarkdown)
        })
      })
    })

    describe('DELETE destroy', () => {
      const destroyLocalizedText = async <StatusCode extends 204 | 400 | 404>(
        localizedText: LocalizedText,
        expectedStatus: StatusCode,
      ) => {
        return request.delete('/v1/host/localized-texts/{id}', expectedStatus, {
          id: localizedText.id,
        })
      }

      it('deletes the LocalizedText', async () => {
        await destroyLocalizedText(localizedText, 204)

        expect(await LocalizedText.find(localizedText.id)).toBeNull()
      })

      context('a LocalizedText associated with a Room belonging to a different Host', () => {
        it('is not deleted', async () => {
          const otherRoom = await createRoomDen()
          localizedText = await otherRoom.associationQuery('localizedTexts').firstOrFail()

          await destroyLocalizedText(localizedText, 404)

          expect(await LocalizedText.find(localizedText.id)).toMatchDreamModel(localizedText)
        })
      })
    })
  })
})
