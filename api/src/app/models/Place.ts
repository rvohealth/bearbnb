import { DreamColumn, DreamSerializers } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'

export default class Place extends ApplicationModel {
  public get table() {
    return 'places' as const
  }

  public get serializers(): DreamSerializers<Place> {
    return {
      default: 'PlaceSerializer',
      summary: 'PlaceSummarySerializer',
    }
  }

  public id: DreamColumn<Place, 'id'>
  public name: DreamColumn<Place, 'name'>
  public style: DreamColumn<Place, 'style'>
  public deletedAt: DreamColumn<Place, 'deletedAt'>
  public createdAt: DreamColumn<Place, 'createdAt'>
  public updatedAt: DreamColumn<Place, 'updatedAt'>
}
