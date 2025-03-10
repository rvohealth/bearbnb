
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer'
import RoomDen from '../../models/Room/Den'

export class RoomDenSummarySerializer<
  DataType extends RoomDen,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {
}

export default class RoomDenSerializer<
  DataType extends RoomDen,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {

}
