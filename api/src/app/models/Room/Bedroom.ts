import { DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import RoomBase from './Base'

@STI(RoomBase)
export default class Bedroom extends RoomBase {
  public get serializers(): DreamSerializers<Bedroom> {
    return {
      default: 'Room/BedroomSerializer',
      summary: 'Room/BedroomSummarySerializer',
    }
  }

  public numberOfBeds: DreamColumn<Bedroom, 'numberOfBeds'>
  public bedTypes: DreamColumn<Bedroom, 'bedTypes'>
}
