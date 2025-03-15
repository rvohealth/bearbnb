import { Attribute, DreamColumn } from '@rvoh/dream'
import Bathroom from '../../models/Room/Bathroom.js'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'

export class RoomBathroomSummarySerializer<
  DataType extends Bathroom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {}

export default class RoomBathroomSerializer<
  DataType extends Bathroom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {
  @Attribute(Bathroom)
  public bathOrShowerType: DreamColumn<Bathroom, 'bathOrShowerType'>
}
