import { Attribute, DreamColumn } from '@rvohealth/dream'
import Bedroom from '../../models/Room/Bedroom'
import RoomBaseSerializer, { RoomBaseSummarySerializer } from './BaseSerializer'

export class RoomBedroomSummarySerializer<
  DataType extends Bedroom,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {}

export default class RoomBedroomSerializer<
  DataType extends Bedroom,
  Passthrough extends object,
> extends RoomBaseSerializer<DataType, Passthrough> {
  @Attribute(Bedroom)
  public numberOfBeds: DreamColumn<Bedroom, 'numberOfBeds'>

  @Attribute(Bedroom)
  public bedTypes: DreamColumn<Bedroom, 'bedTypes'>
}
