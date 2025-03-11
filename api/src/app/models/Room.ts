import { Decorators, DreamColumn, DreamConst, DreamSerializers, SoftDelete } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel'
import LocalizedText from './LocalizedText'
import Place from './Place'

const Deco = new Decorators<InstanceType<typeof Room>>()

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
  public position: DreamColumn<Room, 'position'>
  public deletedAt: DreamColumn<Room, 'deletedAt'>
  public createdAt: DreamColumn<Room, 'createdAt'>
  public updatedAt: DreamColumn<Room, 'updatedAt'>

  @Deco.BelongsTo('Place')
  public place: Place
  public placeId: DreamColumn<Room, 'placeId'>

  @Deco.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId', dependent: 'destroy' })
  public localizedTexts: LocalizedText[]

  @Deco.HasOne('LocalizedText', {
    polymorphic: true,
    foreignKey: 'localizableId',
    on: { locale: DreamConst.required },
  })
  public currentLocalizedText: LocalizedText

  @Deco.AfterCreate()
  public async createDefaultLocalizedText(this: Room) {
    await this.createAssociation('localizedTexts', { locale: 'en-US', title: this.type })
  }
}
