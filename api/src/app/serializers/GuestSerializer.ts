import { Attribute, DreamColumn, DreamSerializer, RendersOne } from '@rvohealth/dream'
import Guest from '../models/Guest'
import User from '../models/User'

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
> extends GuestSummarySerializer<DataType, Passthrough> {
  @RendersOne(User)
  public user: User
}
