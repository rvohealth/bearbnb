import { Attribute, DreamColumn, DreamSerializer, RendersOne } from '@rvohealth/dream'
import RoomBase from '../../models/Room/Base'
import Place from '../../models/Place'

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

    @RendersOne(Place)
  public place: Place

    @Attribute(RoomBase)
  public position: DreamColumn<RoomBase, 'position'>

    @Attribute(RoomBase)
  public deletedAt: DreamColumn<RoomBase, 'deletedAt'>
}
