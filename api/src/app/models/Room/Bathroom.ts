import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '@models/Room.js'

const deco = new Decorators<typeof RoomBathroom>()

@STI(Room)
export default class RoomBathroom extends Room {
  public override get serializers(): DreamSerializers<RoomBathroom> {
    return {
      default: 'Room/BathroomSerializer',
      summary: 'Room/BathroomSummarySerializer',
    }
  }

  public bathOrShowerStyle: DreamColumn<RoomBathroom, 'bathOrShowerStyle'>
}
