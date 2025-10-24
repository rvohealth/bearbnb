import Room from '@models/Room.js'
import { Decorators, STI } from '@rvoh/dream'
import { DreamSerializers } from '@rvoh/dream/types'

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
