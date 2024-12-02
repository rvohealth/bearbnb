import { AfterCreate, DreamColumn, DreamSerializers, SoftDelete } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import LocalizedText from './LocalizedText'
import Place from './Place'

@SoftDelete()
export default class Room extends ApplicationModel {
  public get table() {
    return 'rooms' as const
  }

  public get serializers(): DreamSerializers<Room> {
    return {
      default: 'RoomSerializer',
      summary: 'RoomSummarySerializer',
    }
  }

  public id: DreamColumn<Room, 'id'>
  public type: DreamColumn<Room, 'type'>
  @Room.Sortable({ scope: 'place' })
  public position: DreamColumn<Room, 'position'>
  public deletedAt: DreamColumn<Room, 'deletedAt'>
  public createdAt: DreamColumn<Room, 'createdAt'>
  public updatedAt: DreamColumn<Room, 'updatedAt'>

  @Room.BelongsTo('Place')
  public place: Place
  public placeId: DreamColumn<Room, 'placeId'>

  @Room.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId', dependent: 'destroy' })
  public localizedTexts: LocalizedText[]

  @AfterCreate()
  public async createDefaultLocalizedText(this: Room) {
    await this.createAssociation('localizedTexts', { locale: 'en-US', title: this.type })
  }
}
