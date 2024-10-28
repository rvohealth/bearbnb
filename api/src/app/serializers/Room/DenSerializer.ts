
import RoomBaseSerializer, { RoomBaseSummarySerializer } from './BaseSerializer'
import RoomDen from '../../models/Room/Den'

export class RoomDenSummarySerializer<
  DataType extends RoomDen,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {
}

export default class RoomDenSerializer<
  DataType extends RoomDen,
  Passthrough extends object,
> extends RoomBaseSerializer<DataType, Passthrough> {

}
