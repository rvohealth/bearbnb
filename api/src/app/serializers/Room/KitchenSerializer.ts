import { Attribute, DreamColumn } from '@rvohealth/dream'
import Kitchen from '../../models/Room/Kitchen'
import RoomBaseSerializer, { RoomBaseSummarySerializer } from './BaseSerializer'

export class RoomKitchenSummarySerializer<
  DataType extends Kitchen,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {}

export default class RoomKitchenSerializer<
  DataType extends Kitchen,
  Passthrough extends object,
> extends RoomBaseSerializer<DataType, Passthrough> {
  @Attribute(Kitchen)
  public appliances: DreamColumn<Kitchen, 'appliances'>
}
