import { DreamColumn, DreamSerializers, STI } from '@rvohealth/dream'
import Room from '../Room'

// const Deco = new Decorators<InstanceType<typeof Bathroom>>()

@STI(Room)
export default class Bathroom extends Room {
  public get serializers(): DreamSerializers<Bathroom> {
    return {
      default: 'Room/BathroomSerializer',
      summary: 'Room/BathroomSummarySerializer',
    }
  }

  public bathOrShowerType: DreamColumn<Bathroom, 'bathOrShowerType'>
}
