import { Attribute, DreamColumn, DreamSerializer } from '@rvoh/dream'
import Place from '../models/Place.js'

export class PlaceSummarySerializer<
  DataType extends Place,
  Passthrough extends object,
> extends DreamSerializer<DataType, Passthrough> {
  @Attribute(Place)
  public id: DreamColumn<Place, 'id'>
}

export default class PlaceSerializer<
  DataType extends Place,
  Passthrough extends object,
> extends PlaceSummarySerializer<DataType, Passthrough> {
  @Attribute(Place)
  public name: DreamColumn<Place, 'name'>

    @Attribute(Place)
  public style: DreamColumn<Place, 'style'>

    @Attribute(Place)
  public sleeps: DreamColumn<Place, 'sleeps'>

    @Attribute(Place)
  public deletedAt: DreamColumn<Place, 'deletedAt'>
}
