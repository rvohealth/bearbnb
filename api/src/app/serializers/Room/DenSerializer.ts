
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'
import RoomDen from '../../models/Room/Den.js'

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
