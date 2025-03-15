import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const Deco = new Decorators<InstanceType<typeof RoomKitchen>>()

@STI(Room)
export default class RoomKitchen extends Room {
  public get serializers(): DreamSerializers<RoomKitchen> {
    return {
      default: 'Room/KitchenSerializer',
      summary: 'Room/KitchenSummarySerializer',
    }
  }

  public appliances: DreamColumn<RoomKitchen, 'appliances'>
}
