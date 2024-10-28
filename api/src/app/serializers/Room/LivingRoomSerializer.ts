import LivingRoom from '../../models/Room/LivingRoom'
import RoomBaseSerializer, { RoomBaseSummarySerializer } from './BaseSerializer'

export class RoomLivingRoomSummarySerializer<
  DataType extends LivingRoom,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {}

export default class RoomLivingRoomSerializer<
  DataType extends LivingRoom,
  Passthrough extends object,
> extends RoomBaseSerializer<DataType, Passthrough> {}
