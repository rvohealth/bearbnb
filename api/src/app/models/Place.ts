import { Decorators, DreamColumn, DreamSerializers } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel.js'
import Host from './Host.js'
import HostPlace from './HostPlace.js'
import LocalizedText from './LocalizedText.js'
import Room from './Room.js'

const deco = new Decorators<typeof Place>()

export default class Place extends ApplicationModel {
  public override get table() {
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

  @deco.HasMany('HostPlace', { dependent: 'destroy' })
  public hostPlaces: HostPlace[]

  @deco.HasMany('Host', { through: 'hostPlaces' })
  public hosts: Host[]

  @deco.HasMany('Room')
  public rooms: Room[]

  @deco.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId', dependent: 'destroy' })
  public localizedTexts: LocalizedText[]

  @deco.AfterCreate()
  public async createDefaultLocalizedText(this: Place) {
    await this.createAssociation('localizedTexts', { locale: 'en-US', title: `My ${this.style}` })
  }
}
