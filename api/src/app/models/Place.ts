import { Decorators, DreamColumn, DreamSerializers } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel.js'
import Host from './Host.js'
import HostPlace from './HostPlace.js'

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
}
