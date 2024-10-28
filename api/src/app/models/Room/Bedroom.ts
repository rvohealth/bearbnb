import { DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import RoomBase from './Base'

@STI(RoomBase)
export default class RoomBedroom extends RoomBase {
  public get serializers(): DreamSerializers<RoomBedroom> {
    return {
      default: 'Room/BedroomSerializer',
      summary: 'Room/BedroomSummarySerializer',
    }
  }

  public numberOfBeds: DreamColumn<RoomBedroom, 'numberOfBeds'>
  public bedTypes: DreamColumn<RoomBedroom, 'bedTypes'>
}
