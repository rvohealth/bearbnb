import { Attribute, DreamColumn, DreamSerializer } from '@rvoh/dream'
import Host from '../models/Host.js'

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

}
