import { Attribute, DreamColumn } from '@rvohealth/dream'
import RoomBaseSerializer, { RoomBaseSummarySerializer } from './BaseSerializer'
import RoomBathroom from '../../models/Room/Bathroom'

export class RoomBathroomSummarySerializer<
  DataType extends RoomBathroom,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {
}

export default class RoomBathroomSerializer<
  DataType extends RoomBathroom,
  Passthrough extends object,
> extends RoomBaseSerializer<DataType, Passthrough> {
  @Attribute(RoomBathroom)
  public bathOrShowerType: DreamColumn<RoomBathroom, 'bathOrShowerType'>
}
