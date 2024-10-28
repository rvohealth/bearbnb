
import RoomBaseSerializer, { RoomBaseSummarySerializer } from './BaseSerializer'
import RoomLivingRoom from '../../models/Room/LivingRoom'

export class RoomLivingRoomSummarySerializer<
  DataType extends RoomLivingRoom,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {
}

export default class RoomLivingRoomSerializer<
  DataType extends RoomLivingRoom,
  Passthrough extends object,
> extends RoomBaseSerializer<DataType, Passthrough> {

}
