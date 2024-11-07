import { AfterCreate, DreamColumn, DreamConst, DreamSerializers, SoftDelete } from '@rvohealth/dream'
import ApplicationModel from '../ApplicationModel'
import LocalizedText from '../LocalizedText'
import Place from '../Place'

@SoftDelete()
export default class RoomBase extends ApplicationModel {
  public get table() {
    return 'rooms' as const
  }

  public get serializers(): DreamSerializers<RoomBase> {
    return {
      default: 'Room/BaseSerializer',
      summary: 'Room/BaseSummarySerializer',
    }
  }

  public id: DreamColumn<RoomBase, 'id'>
  public type: DreamColumn<RoomBase, 'type'>
  public deletedAt: DreamColumn<RoomBase, 'deletedAt'>
  public createdAt: DreamColumn<RoomBase, 'createdAt'>
  public updatedAt: DreamColumn<RoomBase, 'updatedAt'>

  @RoomBase.Sortable({ scope: 'place' })
  public position: DreamColumn<RoomBase, 'position'>

  @RoomBase.BelongsTo('Place')
  public place: Place
  public placeId: DreamColumn<RoomBase, 'placeId'>

  @RoomBase.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId', dependent: 'destroy' })
  public localizedTexts: LocalizedText[]

  @Place.HasOne('LocalizedText', {
    polymorphic: true,
    foreignKey: 'localizableId',
    where: { locale: DreamConst.required },
  })
  public currentLocalizedText: LocalizedText

  @AfterCreate()
  private async createDefaultLocalizedText(this: RoomBase) {
    const localizedText = await LocalizedText.create({ localizable: this, title: 'About this room' })
    this.localizedTexts = [localizedText]
  }
}
