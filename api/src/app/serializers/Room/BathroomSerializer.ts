import { Attribute, DreamColumn } from '@rvohealth/dream'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer'
import RoomBathroom from '../../models/Room/Bathroom'

export class RoomBathroomSummarySerializer<
  DataType extends RoomBathroom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {
}

export default class RoomBathroomSerializer<
  DataType extends RoomBathroom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {
  @Attribute(RoomBathroom)
  public bathOrShowerType: DreamColumn<RoomBathroom, 'bathOrShowerType'>
}
