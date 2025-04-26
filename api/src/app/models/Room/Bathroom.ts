import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const deco = new Decorators<typeof RoomBathroom>()

@STI(Room)
export default class RoomBathroom extends Room {
  public override get serializers(): DreamSerializers<RoomBathroom> {
    return {
      default: 'Room/BathroomSerializer',
      summary: 'Room/BathroomSummarySerializer',
    }
  }

  public bathOrShowerType: DreamColumn<RoomBathroom, 'bathOrShowerType'>
}
