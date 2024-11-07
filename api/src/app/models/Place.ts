import { AfterCreate, DreamColumn, DreamConst, DreamSerializers, SoftDelete } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import HostPlace from './HostPlace'
import LocalizedText from './LocalizedText'
import RoomBase from './Room/Base'

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
  public createdAt: DreamColumn<Place, 'createdAt'>
  public updatedAt: DreamColumn<Place, 'updatedAt'>
  public deletedAt: DreamColumn<Place, 'deletedAt'>

  @Place.HasMany('HostPlace', { dependent: 'destroy' })
  public hostPlaces: HostPlace[]

  @Place.HasMany('Room/Base', { dependent: 'destroy' })
  public rooms: RoomBase[]

  @Place.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId', dependent: 'destroy' })
  public localizedTexts: LocalizedText[]

  @Place.HasOne('LocalizedText', {
    polymorphic: true,
    foreignKey: 'localizableId',
    where: { locale: DreamConst.required },
  })
  public currentLocalizedText: LocalizedText

  @AfterCreate()
  private async createDefaultLocalizedText(this: Place) {
    const localizedText = await LocalizedText.create({ localizable: this, title: 'About this place' })
    this.localizedTexts = [localizedText]
  }
}
