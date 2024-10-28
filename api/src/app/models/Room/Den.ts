import { DreamSerializers, STI } from '@rvohealth/dream'
import RoomBase from './Base'

@STI(RoomBase)
export default class Den extends RoomBase {
  public get serializers(): DreamSerializers<Den> {
    return {
      default: 'Room/DenSerializer',
      summary: 'Room/DenSummarySerializer',
    }
  }
}
