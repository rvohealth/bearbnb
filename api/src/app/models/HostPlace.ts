import { DreamColumn } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import Host from './Host'
import Place from './Place'

export default class HostPlace extends ApplicationModel {
  public get table() {
    return 'host_places' as const
  }

  public id: DreamColumn<HostPlace, 'id'>
  public deletedAt: DreamColumn<HostPlace, 'deletedAt'>
  public createdAt: DreamColumn<HostPlace, 'createdAt'>
  public updatedAt: DreamColumn<HostPlace, 'updatedAt'>

  @HostPlace.BelongsTo('Host')
  public host: Host
  public hostId: DreamColumn<HostPlace, 'hostId'>

  @HostPlace.BelongsTo('Place')
  public place: Place
  public placeId: DreamColumn<HostPlace, 'placeId'>
}
