import { Attribute, DreamColumn } from '@rvohealth/dream'
import RoomBaseSerializer, { RoomBaseSummarySerializer } from './BaseSerializer'
import RoomBedroom from '../../models/Room/Bedroom'

export class RoomBedroomSummarySerializer<
  DataType extends RoomBedroom,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {
}

export default class RoomBedroomSerializer<
  DataType extends RoomBedroom,
  Passthrough extends object,
> extends RoomBaseSerializer<DataType, Passthrough> {
  @Attribute(RoomBedroom)
  public numberOfBeds: DreamColumn<RoomBedroom, 'numberOfBeds'>

    @Attribute(RoomBedroom)
  public bedTypes: DreamColumn<RoomBedroom, 'bedTypes'>
}
