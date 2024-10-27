import { DreamColumn, DreamSerializers } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import Guest from './Guest'
import Place from './Place'

export default class Stay extends ApplicationModel {
  public get table() {
    return 'stays' as const
  }

  public get serializers(): DreamSerializers<Stay> {
    return {
      default: 'StaySerializer',
      summary: 'StaySummarySerializer',
    }
  }

  public id: DreamColumn<Stay, 'id'>
  public checkinOn: DreamColumn<Stay, 'checkinOn'>
  public checkoutOn: DreamColumn<Stay, 'checkoutOn'>
  public adults: DreamColumn<Stay, 'adults'>
  public cubs: DreamColumn<Stay, 'cubs'>
  public createdAt: DreamColumn<Stay, 'createdAt'>
  public updatedAt: DreamColumn<Stay, 'updatedAt'>

  @Stay.BelongsTo('Guest')
  public guest: Guest
  public guestId: DreamColumn<Stay, 'guestId'>

  @Stay.BelongsTo('Place')
  public place: Place
  public placeId: DreamColumn<Stay, 'placeId'>
}
