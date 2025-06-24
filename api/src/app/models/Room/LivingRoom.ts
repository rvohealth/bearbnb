import { Decorators, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const deco = new Decorators<typeof LivingRoom>()

@STI(Room)
export default class LivingRoom extends Room {
  public get serializers(): DreamSerializers<LivingRoom> {
    return {
      default: 'Room/LivingRoomSerializer',
      summary: 'Room/LivingRoomSummarySerializer',
      forGuests: 'Room/LivingRoomForGuestsSerializer',
    }
  }
}
