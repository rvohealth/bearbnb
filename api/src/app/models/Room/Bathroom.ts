import { DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import RoomBase from './Base'

@STI(RoomBase)
export default class Bathroom extends RoomBase {
  public get serializers(): DreamSerializers<Bathroom> {
    return {
      default: 'Room/BathroomSerializer',
      summary: 'Room/BathroomSummarySerializer',
    }
  }

  public bathOrShowerType: DreamColumn<Bathroom, 'bathOrShowerType'>
}
