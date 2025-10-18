import Room from '@models/Room.js'
import { Decorators, DreamSerializers, STI } from '@rvoh/dream'

const deco = new Decorators<typeof LivingRoom>()

@STI(Room)
export default class LivingRoom extends Room {
  public override get serializers(): DreamSerializers<LivingRoom> {
    return {
      default: 'Room/LivingRoomSerializer',
      summary: 'Room/LivingRoomSummarySerializer',
    }
  }
}
