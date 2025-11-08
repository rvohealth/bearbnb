import Room from '@models/Room.js'
import { Decorators, STI } from '@rvoh/dream'
import { DreamColumn, DreamSerializers } from '@rvoh/dream/types'

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
