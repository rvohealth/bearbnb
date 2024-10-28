import { DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import RoomBase from './Base'

@STI(RoomBase)
export default class RoomBathroom extends RoomBase {
  public get serializers(): DreamSerializers<RoomBathroom> {
    return {
      default: 'Room/BathroomSerializer',
      summary: 'Room/BathroomSummarySerializer',
    }
  }

  public bathOrShowerType: DreamColumn<RoomBathroom, 'bathOrShowerType'>
}
