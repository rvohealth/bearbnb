import { Attribute, DreamColumn } from '@rvoh/dream'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'
import RoomKitchen from '../../models/Room/Kitchen.js'

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
