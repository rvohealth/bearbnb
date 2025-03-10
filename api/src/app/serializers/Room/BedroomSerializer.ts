import { Attribute, DreamColumn } from '@rvohealth/dream'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer'
import RoomBedroom from '../../models/Room/Bedroom'

export class RoomBedroomSummarySerializer<
  DataType extends RoomBedroom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {
}

export default class RoomBedroomSerializer<
  DataType extends RoomBedroom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {
  @Attribute(RoomBedroom)
  public bedTypes: DreamColumn<RoomBedroom, 'bedTypes'>
}
