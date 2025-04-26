import { Attribute, DreamColumn } from '@rvoh/dream'
import Bedroom from '../../models/Room/Bedroom.js'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'

export class BedroomSummarySerializer<
  DataType extends Bedroom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {}

export default class BedroomSerializer<
  DataType extends Bedroom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {
  @Attribute(Bedroom)
  public bedTypes: DreamColumn<Bedroom, 'bedTypes'>
}
