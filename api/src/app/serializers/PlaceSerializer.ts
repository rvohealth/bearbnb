import { DreamSerializer } from '@rvoh/dream'
import Place from '@models/Place.js'

export const PlaceSummarySerializer = (place: Place) =>
  DreamSerializer(Place, place)
    .attribute('id')

export const PlaceSerializer = (place: Place) =>
  PlaceSummarySerializer(place)
    .attribute('name')
    .attribute('style')
    .attribute('sleeps')
    .attribute('deletedAt')
