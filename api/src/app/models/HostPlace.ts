import { Decorators, DreamColumn, SoftDelete } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel.js'
import Host from './Host.js'
import Place from './Place.js'

const Deco = new Decorators<InstanceType<typeof HostPlace>>()

@SoftDelete()
export default class HostPlace extends ApplicationModel {
  public get table() {
    return 'host_places' as const
  }

  public id: DreamColumn<HostPlace, 'id'>
  public deletedAt: DreamColumn<HostPlace, 'deletedAt'>
  public createdAt: DreamColumn<HostPlace, 'createdAt'>
  public updatedAt: DreamColumn<HostPlace, 'updatedAt'>

  @Deco.BelongsTo('Host')
  public host: Host
  public hostId: DreamColumn<HostPlace, 'hostId'>

  @Deco.BelongsTo('Place')
  public place: Place
  public placeId: DreamColumn<HostPlace, 'placeId'>
}
