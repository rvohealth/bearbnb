import LivingRoom from '../../models/Room/LivingRoom.js'
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'

export class RoomLivingRoomSummarySerializer<
  DataType extends LivingRoom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {}

export default class RoomLivingRoomSerializer<
  DataType extends LivingRoom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {}
