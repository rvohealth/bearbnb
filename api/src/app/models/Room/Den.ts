import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const Deco = new Decorators<InstanceType<typeof RoomDen>>()

@STI(Room)
export default class RoomDen extends Room {
  public get serializers(): DreamSerializers<RoomDen> {
    return {
      default: 'Room/DenSerializer',
      summary: 'Room/DenSummarySerializer',
    }
  }

}
