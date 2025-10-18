import Room from '@models/Room.js'
import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'

const deco = new Decorators<typeof Bedroom>()

@STI(Room)
export default class Bedroom extends Room {
  public override get serializers(): DreamSerializers<Bedroom> {
    return {
      default: 'Room/BedroomSerializer',
      summary: 'Room/BedroomSummarySerializer',
    }
  }

  public bedTypes: DreamColumn<Bedroom, 'bedTypes'>
}
