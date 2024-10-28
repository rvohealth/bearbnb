import Den from '../../models/Room/Den'
import RoomBaseSerializer, { RoomBaseSummarySerializer } from './BaseSerializer'

export class RoomDenSummarySerializer<
  DataType extends Den,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {}

export default class RoomDenSerializer<
  DataType extends Den,
  Passthrough extends object,
> extends RoomBaseSerializer<DataType, Passthrough> {}
