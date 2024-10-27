import { Attribute, DreamColumn, DreamSerializer } from '@rvohealth/dream'
import Guest from '../models/Guest'

export class GuestSummarySerializer<
  DataType extends Guest,
  Passthrough extends object,
> extends DreamSerializer<DataType, Passthrough> {
  @Attribute(Guest)
  public id: DreamColumn<Guest, 'id'>
}

export default class GuestSerializer<
  DataType extends Guest,
  Passthrough extends object,
> extends GuestSummarySerializer<DataType, Passthrough> {}
