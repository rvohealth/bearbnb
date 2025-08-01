import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const deco = new Decorators<typeof Bedroom>()

@STI(Room)
export default class Bedroom extends Room {
  public get serializers(): DreamSerializers<Bedroom> {
    return {
      default: 'Room/BedroomSerializer',
      summary: 'Room/BedroomSummarySerializer',
      forGuests: 'Room/BedroomForGuestsSerializer',
    }
  }

  public bedTypes: DreamColumn<Bedroom, 'bedTypes'>
}
