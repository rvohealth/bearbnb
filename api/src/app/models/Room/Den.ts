import Room from '@models/Room.js'
import { Decorators, STI } from '@rvoh/dream'
import { DreamSerializers } from '@rvoh/dream/types'

const deco = new Decorators<typeof Den>()

@STI(Room)
export default class Den extends Room {
  public get serializers(): DreamSerializers<Den> {
    return {
      default: 'Room/DenSerializer',
      summary: 'Room/DenSummarySerializer',
    }
  }
}
