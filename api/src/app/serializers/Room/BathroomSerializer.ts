import { Attribute, DreamColumn } from '@rvoh/dream'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'
import RoomBathroom from '../../models/Room/Bathroom.js'

export class BathroomSummarySerializer<
  DataType extends RoomBathroom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {
}

export default class BathroomSerializer<
  DataType extends RoomBathroom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {
  @Attribute(RoomBathroom)
  public bathOrShowerType: DreamColumn<RoomBathroom, 'bathOrShowerType'>
}
