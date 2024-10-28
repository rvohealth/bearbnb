import { Attribute, DreamColumn, DreamSerializer } from '@rvohealth/dream'
import RoomBase from '../../models/Room/Base'

export class RoomBaseSummarySerializer<
  DataType extends RoomBase,
  Passthrough extends object,
> extends DreamSerializer<DataType, Passthrough> {
  @Attribute(RoomBase)
  public id: DreamColumn<RoomBase, 'id'>
}

export default class RoomBaseSerializer<
  DataType extends RoomBase,
  Passthrough extends object,
> extends RoomBaseSummarySerializer<DataType, Passthrough> {
  @Attribute(RoomBase)
  public type: DreamColumn<RoomBase, 'type'>

  @Attribute(RoomBase)
  public position: DreamColumn<RoomBase, 'position'>

  @Attribute(RoomBase)
  public deletedAt: DreamColumn<RoomBase, 'deletedAt'>
}
