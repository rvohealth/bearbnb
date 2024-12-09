import { Attribute, DreamColumn, DreamSerializer } from '@rvohealth/dream'
import Place from '../models/Place'

export class PlaceSummarySerializer<
  DataType extends Place,
  Passthrough extends object,
> extends DreamSerializer<DataType, Passthrough> {
  @Attribute(Place)
  public id: DreamColumn<Place, 'id'>

  @Attribute(Place)
  public name: DreamColumn<Place, 'name'>

  @Attribute(Place)
  public style: DreamColumn<Place, 'style'>
}

export default class PlaceSerializer<
  DataType extends Place,
  Passthrough extends object,
> extends PlaceSummarySerializer<DataType, Passthrough> {
  @Attribute(Place)
  public sleeps: DreamColumn<Place, 'sleeps'>

  @Attribute(Place)
  public deletedAt: DreamColumn<Place, 'deletedAt'>
}
