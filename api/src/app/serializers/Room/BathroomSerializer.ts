import { Attribute, DreamColumn } from '@rvohealth/dream'
import Bathroom from '../../models/Room/Bathroom'
import RoomBaseSerializer, { RoomBaseSummarySerializer } from './BaseSerializer'

export class RoomBathroomSummarySerializer<
  DataType extends Bathroom,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {}

export default class RoomBathroomSerializer<
  DataType extends Bathroom,
  Passthrough extends object,
> extends RoomBaseSerializer<DataType, Passthrough> {
  @Attribute(Bathroom)
  public bathOrShowerType: DreamColumn<Bathroom, 'bathOrShowerType'>
}
