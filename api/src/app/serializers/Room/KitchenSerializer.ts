import { Attribute, DreamColumn } from '@rvoh/dream'
import Kitchen from '../../models/Room/Kitchen'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer'

export class RoomKitchenSummarySerializer<
  DataType extends Kitchen,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {}

export default class RoomKitchenSerializer<
  DataType extends Kitchen,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {
  @Attribute(Kitchen)
  public appliances: DreamColumn<Kitchen, 'appliances'>
}
