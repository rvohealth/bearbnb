import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const Deco = new Decorators<InstanceType<typeof RoomBedroom>>()

@STI(Room)
export default class RoomBedroom extends Room {
  public get serializers(): DreamSerializers<RoomBedroom> {
    return {
      default: 'Room/BedroomSerializer',
      summary: 'Room/BedroomSummarySerializer',
    }
  }

  public bedTypes: DreamColumn<RoomBedroom, 'bedTypes'>
}
