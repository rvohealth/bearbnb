import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvoh/dream'
import Room from '../Room.js'

const deco = new Decorators<typeof Kitchen>()

@STI(Room)
export default class Kitchen extends Room {
  public override get serializers(): DreamSerializers<Kitchen> {
    return {
      default: 'Room/KitchenSerializer',
      summary: 'Room/KitchenSummarySerializer',
    }
  }

  public appliances: DreamColumn<Kitchen, 'appliances'>
}
