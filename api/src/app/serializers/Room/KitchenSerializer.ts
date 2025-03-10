import { Attribute, DreamColumn } from '@rvohealth/dream'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer'
import RoomKitchen from '../../models/Room/Kitchen'

export class RoomKitchenSummarySerializer<
  DataType extends RoomKitchen,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {
}

export default class RoomKitchenSerializer<
  DataType extends RoomKitchen,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {
  @Attribute(RoomKitchen)
  public appliances: DreamColumn<RoomKitchen, 'appliances'>
}
