import { Decorators, DreamColumn } from '@rvoh/dream'
import ApplicationModel from '@models/ApplicationModel.js'
import Host from '@models/Host.js'
import Place from '@models/Place.js'

const deco = new Decorators<typeof HostPlace>()

export default class HostPlace extends ApplicationModel {
  public override get table() {
    return 'host_places' as const
  }

  public id: DreamColumn<HostPlace, 'id'>
  public deletedAt: DreamColumn<HostPlace, 'deletedAt'>
  public createdAt: DreamColumn<HostPlace, 'createdAt'>
  public updatedAt: DreamColumn<HostPlace, 'updatedAt'>

  @deco.BelongsTo('Host', { on: 'hostId' })
  public host: Host
  public hostId: DreamColumn<HostPlace, 'hostId'>

  @deco.BelongsTo('Place', { on: 'placeId' })
  public place: Place
  public placeId: DreamColumn<HostPlace, 'placeId'>
}
