import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import Room from '../Room'

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
