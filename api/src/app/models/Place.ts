import ApplicationModel from '@models/ApplicationModel.js'
import Host from '@models/Host.js'
import HostPlace from '@models/HostPlace.js'
import Room from '@models/Room.js'
import { Decorators } from '@rvoh/dream'
import { DreamColumn, DreamSerializers } from '@rvoh/dream/types'

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
}
