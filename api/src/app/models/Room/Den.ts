import { Decorators, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const deco = new Decorators<typeof Den>()

@STI(Room)
export default class Den extends Room {
  public get serializers(): DreamSerializers<Den> {
    return {
      default: 'Room/DenSerializer',
      summary: 'Room/DenSummarySerializer',
      forGuests: 'Room/DenForGuestsSerializer',
    }
  }
}
