import { DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

// const Deco = new Decorators<InstanceType<typeof RoomLivingRoom>>()

@STI(Room)
export default class LivingRoom extends Room {
  public get serializers(): DreamSerializers<LivingRoom> {
    return {
      default: 'Room/LivingRoomSerializer',
      summary: 'Room/LivingRoomSummarySerializer',
    }
  }
}
