import { Decorators, DreamColumn, DreamSerializers } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import Host from './Host'
import HostPlace from './HostPlace'
import LocalizedText from './LocalizedText'
import Room from './Room'

const Deco = new Decorators<InstanceType<typeof Place>>()

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

  @Deco.HasMany('HostPlace', { dependent: 'destroy' })
  public hostPlaces: HostPlace[]

  @Deco.HasMany('Host', { through: 'hostPlaces' })
  public hosts: Host[]

  @Deco.HasMany('Room', { dependent: 'destroy' })
  public rooms: Room[]

  @Deco.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId', dependent: 'destroy' })
  public localizedTexts: LocalizedText[]

  @Deco.AfterCreate()
  public async createDefaultLocalizedText(this: Place) {
    await this.createAssociation('localizedTexts', { locale: 'en-US', title: `My ${this.style}` })
  }
}
