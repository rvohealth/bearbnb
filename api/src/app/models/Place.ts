import { AfterCreate, DreamColumn, DreamSerializers, SoftDelete } from '@rvohealth/dream'
import { Room } from 'socket.io-adapter'
import ApplicationModel from './ApplicationModel'
import HostPlace from './HostPlace'
import LocalizedText from './LocalizedText'

@SoftDelete()
export default class Place extends ApplicationModel {
  public get table() {
    return 'places' as const
  }

  public get serializers(): DreamSerializers<Place> {
    return {
      default: 'PlaceSerializer',
      summary: 'PlaceSummarySerializer',
    }
  }

  public id: DreamColumn<Place, 'id'>
  public name: DreamColumn<Place, 'name'>
  public style: DreamColumn<Place, 'style'>
  public sleeps: DreamColumn<Place, 'sleeps'>
  public deletedAt: DreamColumn<Place, 'deletedAt'>
  public createdAt: DreamColumn<Place, 'createdAt'>
  public updatedAt: DreamColumn<Place, 'updatedAt'>

  @Place.HasMany('HostPlace', { dependent: 'destroy' })
  public hostPlaces: HostPlace[]

  @Place.HasMany('Room', { dependent: 'destroy' })
  public rooms: Room[]

  @Place.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId', dependent: 'destroy' })
  public localizedTexts: LocalizedText[]

  @AfterCreate()
  public async createDefaultLocalizedText(this: Place) {
    await this.createAssociation('localizedTexts', { locale: 'en-US', title: `My ${this.style}` })
  }
}
