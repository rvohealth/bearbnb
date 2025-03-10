import Den from '../../models/Room/Den'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer'

export class RoomDenSummarySerializer<
  DataType extends Den,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {}

export default class RoomDenSerializer<
  DataType extends Den,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {}
