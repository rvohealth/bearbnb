import { Decorators, DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import Room from '../Room'

const Deco = new Decorators<InstanceType<typeof RoomBathroom>>()

@STI(Room)
export default class RoomBathroom extends Room {
  public get serializers(): DreamSerializers<RoomBathroom> {
    return {
      default: 'Room/BathroomSerializer',
      summary: 'Room/BathroomSummarySerializer',
    }
  }

  public bathOrShowerType: DreamColumn<RoomBathroom, 'bathOrShowerType'>
}
