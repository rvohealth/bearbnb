import { Attribute, DreamColumn } from '@rvoh/dream'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'
import RoomBedroom from '../../models/Room/Bedroom.js'

export class BedroomSummarySerializer<
  DataType extends RoomBedroom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {
}

export default class BedroomSerializer<
  DataType extends RoomBedroom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {
  @Attribute(RoomBedroom)
  public bedTypes: DreamColumn<RoomBedroom, 'bedTypes'>
}
