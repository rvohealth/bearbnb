import { Attribute, DreamColumn, DreamSerializer, RendersOne } from '@rvohealth/dream'
import Host from '../models/Host'
import User from '../models/User'

export class HostSummarySerializer<
  DataType extends Host,
  Passthrough extends object,
> extends DreamSerializer<DataType, Passthrough> {
  @Attribute(Host)
  public id: DreamColumn<Host, 'id'>
}

export default class HostSerializer<
  DataType extends Host,
  Passthrough extends object,
> extends HostSummarySerializer<DataType, Passthrough> {
  @RendersOne(User)
  public user: User
}
