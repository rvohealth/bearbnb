import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const deco = new Decorators<typeof Bathroom>()

@STI(Room)
export default class Bathroom extends Room {
  public get serializers(): DreamSerializers<Bathroom> {
    return {
      default: 'Room/BathroomSerializer',
      summary: 'Room/BathroomSummarySerializer',
      forGuests: 'Room/BathroomForGuestsSerializer',
    }
  }

  public bathOrShowerType: DreamColumn<Bathroom, 'bathOrShowerType'>
}
