
import RoomSerializer, { RoomSummarySerializer } from '../RoomSerializer'
import RoomLivingRoom from '../../models/Room/LivingRoom'

export class RoomLivingRoomSummarySerializer<
  DataType extends RoomLivingRoom,
  Passthrough extends object,
> extends RoomSummarySerializer<DataType, Passthrough> {
}

export default class RoomLivingRoomSerializer<
  DataType extends RoomLivingRoom,
  Passthrough extends object,
> extends RoomSerializer<DataType, Passthrough> {

}
