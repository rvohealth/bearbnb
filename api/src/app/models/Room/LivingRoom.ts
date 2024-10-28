import { DreamSerializers, STI } from '@rvohealth/dream'
import RoomBase from './Base'

@STI(RoomBase)
export default class LivingRoom extends RoomBase {
  public get serializers(): DreamSerializers<LivingRoom> {
    return {
      default: 'Room/LivingRoomSerializer',
      summary: 'Room/LivingRoomSummarySerializer',
    }
  }
}
