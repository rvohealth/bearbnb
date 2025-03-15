import Den from '../../models/Room/Den.js'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'

export class RoomDenSummarySerializer<
  DataType extends Den,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {}

export default class RoomDenSerializer<
  DataType extends Den,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {}
