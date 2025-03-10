import { DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import Room from '../Room'

// const Deco = new Decorators<InstanceType<typeof Bedroom>>()

@STI(Room)
export default class Bedroom extends Room {
  public get serializers(): DreamSerializers<Bedroom> {
    return {
      default: 'Room/BedroomSerializer',
      summary: 'Room/BedroomSummarySerializer',
    }
  }

  public bedTypes: DreamColumn<Bedroom, 'bedTypes'>
}
