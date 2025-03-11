import { DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room'

// const Deco = new Decorators<InstanceType<typeof LivingRoom>>()

@STI(Room)
export default class LivingRoom extends Room {
  public get serializers(): DreamSerializers<LivingRoom> {
    return {
      default: 'Room/LivingRoomSerializer',
      summary: 'Room/LivingRoomSummarySerializer',
    }
  }
}
