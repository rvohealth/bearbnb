import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '@models/Room.js'

const deco = new Decorators<typeof RoomLivingRoom>()

@STI(Room)
export default class RoomLivingRoom extends Room {
  public override get serializers(): DreamSerializers<RoomLivingRoom> {
    return {
      default: 'Room/LivingRoomSerializer',
      summary: 'Room/LivingRoomSummarySerializer',
    }
  }

}
