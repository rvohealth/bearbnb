import Room from '@models/Room.js'
import { Decorators, DreamSerializers, STI } from '@rvoh/dream'

const deco = new Decorators<typeof Den>()

@STI(Room)
export default class Den extends Room {
  public override get serializers(): DreamSerializers<Den> {
    return {
      default: 'Room/DenSerializer',
      summary: 'Room/DenSummarySerializer',
    }
  }
}
