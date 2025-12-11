import { Decorators, STI } from '@rvoh/dream'
import { DreamColumn, DreamSerializers } from '@rvoh/dream/types'
import Room from '@models/Room.js'

const deco = new Decorators<typeof RoomKitchen>()

@STI(Room)
export default class RoomKitchen extends Room {
  public override get serializers(): DreamSerializers<RoomKitchen> {
    return {
      default: 'Room/KitchenSerializer',
      summary: 'Room/KitchenSummarySerializer',
    }
  }

  public appliances: DreamColumn<RoomKitchen, 'appliances'>
}
