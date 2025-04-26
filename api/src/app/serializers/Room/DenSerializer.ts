
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'
import RoomDen from '../../models/Room/Den.js'

export class DenSummarySerializer<
  DataType extends RoomDen,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {
}

export default class DenSerializer<
  DataType extends RoomDen,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {

}
