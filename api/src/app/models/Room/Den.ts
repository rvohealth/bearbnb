import { DreamSerializers, STI } from '@rvohealth/dream'
import Room from '../Room'

// const Deco = new Decorators<InstanceType<typeof Den>>()

@STI(Room)
export default class Den extends Room {
  public get serializers(): DreamSerializers<Den> {
    return {
      default: 'Room/DenSerializer',
      summary: 'Room/DenSummarySerializer',
    }
  }
}
