import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '@models/Room.js'

const deco = new Decorators<typeof RoomBedroom>()

@STI(Room)
export default class RoomBedroom extends Room {
  public override get serializers(): DreamSerializers<RoomBedroom> {
    return {
      default: 'Room/BedroomSerializer',
      summary: 'Room/BedroomSummarySerializer',
    }
  }

  public bedTypes: DreamColumn<RoomBedroom, 'bedTypes'>
}
