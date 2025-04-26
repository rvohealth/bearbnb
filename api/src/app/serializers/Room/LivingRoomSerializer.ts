import LivingRoom from '../../models/Room/LivingRoom.js'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'

export class LivingRoomSummarySerializer<
  DataType extends LivingRoom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {}

export default class LivingRoomSerializer<
  DataType extends LivingRoom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {}
