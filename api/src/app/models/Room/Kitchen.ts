import { DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import RoomBase from './Base'

@STI(RoomBase)
export default class Kitchen extends RoomBase {
  public get serializers(): DreamSerializers<Kitchen> {
    return {
      default: 'Room/KitchenSerializer',
      summary: 'Room/KitchenSummarySerializer',
    }
  }

  public appliances: DreamColumn<Kitchen, 'appliances'>
}
