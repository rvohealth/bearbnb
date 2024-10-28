import { DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import RoomBase from './Base'

@STI(RoomBase)
export default class RoomKitchen extends RoomBase {
  public get serializers(): DreamSerializers<RoomKitchen> {
    return {
      default: 'Room/KitchenSerializer',
      summary: 'Room/KitchenSummarySerializer',
    }
  }

  public appliances: DreamColumn<RoomKitchen, 'appliances'>
}
