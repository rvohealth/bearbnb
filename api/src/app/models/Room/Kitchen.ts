import { DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import Room from '../Room'

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
