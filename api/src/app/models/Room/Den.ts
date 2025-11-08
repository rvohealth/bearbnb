import { Decorators, STI } from '@rvoh/dream'
import { DreamColumn, DreamSerializers } from '@rvoh/dream/types'
import Room from '@models/Room.js'

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
