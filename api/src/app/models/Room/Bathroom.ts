import Room from '@models/Room.js'
import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'

const deco = new Decorators<typeof Bathroom>()

@STI(Room)
export default class Bathroom extends Room {
  public override get serializers(): DreamSerializers<Bathroom> {
    return {
      default: 'Room/BathroomSerializer',
      summary: 'Room/BathroomSummarySerializer',
    }
  }

  public bathOrShowerStyle: DreamColumn<Bathroom, 'bathOrShowerStyle'>
}
