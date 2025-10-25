import Place from '@models/Place.js'
import { DreamSerializer } from '@rvoh/dream'
import { LocalesEnum } from '@src/types/db.js'
import i18n from '@src/utils/i18n.js'

// prettier-ignore
export const PlaceSummarySerializer = (place: Place) =>
  DreamSerializer(Place, place)
    .attribute('id')
    .attribute('name')

// prettier-ignore
export const PlaceSerializer = (place: Place) =>
  PlaceSummarySerializer(place)
    .attribute('style')
    .attribute('sleeps')
    .attribute('deletedAt')

export const PlaceSummaryForGuestsSerializer = (place: Place) =>
  DreamSerializer(Place, place)
    .attribute('id')
    .delegatedAttribute('currentLocalizedText', 'title', { openapi: 'string' })

export const PlaceForGuestsSerializer = (place: Place, passthrough: { locale: LocalesEnum }) =>
  PlaceSummaryForGuestsSerializer(place)
    .attribute('style')
    .customAttribute('displayStyle', () => i18n(passthrough.locale, `places.style.${place.style}`), {
      openapi: 'string',
    })
    .attribute('sleeps')
    .rendersMany('rooms', { serializerKey: 'forGuests' })
