import { Attribute, DreamColumn } from '@rvohealth/dream'
import Bedroom from '../../models/Room/Bedroom'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer'

export class RoomBedroomSummarySerializer<
  DataType extends Bedroom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {}

export default class RoomBedroomSerializer<
  DataType extends Bedroom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {
  @Attribute(Bedroom)
  public bedTypes: DreamColumn<Bedroom, 'bedTypes'>
}
