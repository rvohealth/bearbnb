import { DreamColumn, DreamSerializers } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import HostPlace from './HostPlace'
import Place from './Place'
import User from './User'

export default class Host extends ApplicationModel {
  public get table() {
    return 'hosts' as const
  }

  public get serializers(): DreamSerializers<Host> {
    return {
      default: 'HostSerializer',
      summary: 'HostSummarySerializer',
    }
  }

  public id: DreamColumn<Host, 'id'>
  public createdAt: DreamColumn<Host, 'createdAt'>
  public updatedAt: DreamColumn<Host, 'updatedAt'>

  @Host.BelongsTo('User')
  public user: User
  public userId: DreamColumn<Host, 'userId'>

  @Host.HasMany('HostPlace')
  public hostPlaces: HostPlace[]

  @Host.HasMany('Place', { through: 'hostPlaces' })
  public places: Place[]
}
