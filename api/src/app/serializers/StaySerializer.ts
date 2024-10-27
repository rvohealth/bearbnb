import { Attribute, DreamColumn, DreamSerializer, RendersOne } from '@rvohealth/dream'
import Stay from '../models/Stay'
import Guest from '../models/Guest'
import Place from '../models/Place'

export class StaySummarySerializer<
  DataType extends Stay,
  Passthrough extends object,
> extends DreamSerializer<DataType, Passthrough> {
  @Attribute(Stay)
  public id: DreamColumn<Stay, 'id'>
}

export default class StaySerializer<
  DataType extends Stay,
  Passthrough extends object,
> extends StaySummarySerializer<DataType, Passthrough> {
  @RendersOne(Guest)
  public guest: Guest

    @RendersOne(Place)
  public place: Place

    @Attribute(Stay)
  public checkinOn: DreamColumn<Stay, 'checkinOn'>

    @Attribute(Stay)
  public checkoutOn: DreamColumn<Stay, 'checkoutOn'>

    @Attribute(Stay)
  public adults: DreamColumn<Stay, 'adults'>

    @Attribute(Stay)
  public cubs: DreamColumn<Stay, 'cubs'>
}
