import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const Deco = new Decorators<InstanceType<typeof RoomLivingRoom>>()

@STI(Room)
export default class RoomLivingRoom extends Room {
  public get serializers(): DreamSerializers<RoomLivingRoom> {
    return {
      default: 'Room/LivingRoomSerializer',
      summary: 'Room/LivingRoomSummarySerializer',
    }
  }

}
