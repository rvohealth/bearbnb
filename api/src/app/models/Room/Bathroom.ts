import Room from '@models/Room.js'
import { Decorators, STI } from '@rvoh/dream'
import { DreamColumn, DreamSerializers } from '@rvoh/dream/types'

const deco = new Decorators<typeof Bathroom>()

@STI(Room)
export default class Bathroom extends Room {
  public get serializers(): DreamSerializers<Bathroom> {
    return {
      default: 'Room/BathroomSerializer',
      summary: 'Room/BathroomSummarySerializer',
    }
  }

  public bathOrShowerStyle: DreamColumn<Bathroom, 'bathOrShowerStyle'>
}
