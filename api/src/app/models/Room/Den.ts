import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const deco = new Decorators<typeof RoomDen>()

@STI(Room)
export default class RoomDen extends Room {
  public override get serializers(): DreamSerializers<RoomDen> {
    return {
      default: 'Room/DenSerializer',
      summary: 'Room/DenSummarySerializer',
    }
  }

}
