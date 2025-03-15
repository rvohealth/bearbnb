import { DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

// const Deco = new Decorators<InstanceType<typeof RoomKitchen>>()

@STI(Room)
export default class Kitchen extends Room {
  public get serializers(): DreamSerializers<Kitchen> {
    return {
      default: 'Room/KitchenSerializer',
      summary: 'Room/KitchenSummarySerializer',
    }
  }

  public appliances: DreamColumn<Kitchen, 'appliances'>
}
