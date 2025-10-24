import Place from '@models/Place.js'
import { DreamSerializer } from '@rvoh/dream'

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
