
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer.js'
import RoomLivingRoom from '../../models/Room/LivingRoom.js'

export class LivingRoomSummarySerializer<
  DataType extends RoomLivingRoom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {
}

export default class LivingRoomSerializer<
  DataType extends RoomLivingRoom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {

}
