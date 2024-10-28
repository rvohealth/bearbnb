import { Attribute, DreamColumn } from '@rvohealth/dream'
import RoomBaseSerializer, { RoomBaseSummarySerializer } from './BaseSerializer'
import RoomKitchen from '../../models/Room/Kitchen'

export class RoomKitchenSummarySerializer<
  DataType extends RoomKitchen,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {
}

export default class RoomKitchenSerializer<
  DataType extends RoomKitchen,
  Passthrough extends object,
> extends RoomBaseSerializer<DataType, Passthrough> {
  @Attribute(RoomKitchen)
  public appliances: DreamColumn<RoomKitchen, 'appliances'>
}
