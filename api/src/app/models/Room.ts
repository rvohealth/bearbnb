import { Decorators, DreamColumn, DreamConst, SoftDelete } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel.js'
import LocalizedText from './LocalizedText.js'
import Place from './Place.js'

const deco = new Decorators<typeof Room>()

@SoftDelete()
export default class Room extends ApplicationModel {
  public override get table() {
    return 'rooms' as const
  }

  public id: DreamColumn<Room, 'id'>
  public type: DreamColumn<Room, 'type'>
  public position: DreamColumn<Room, 'position'>
  public deletedAt: DreamColumn<Room, 'deletedAt'>
  public createdAt: DreamColumn<Room, 'createdAt'>
  public updatedAt: DreamColumn<Room, 'updatedAt'>

  @deco.BelongsTo('Place')
  public place: Place
  public placeId: DreamColumn<Room, 'placeId'>

  @deco.HasMany('LocalizedText', { polymorphic: true, foreignKey: 'localizableId', dependent: 'destroy' })
  public localizedTexts: LocalizedText[]

  @deco.HasOne('LocalizedText', {
    polymorphic: true,
    foreignKey: 'localizableId',
    and: { locale: DreamConst.passthrough },
  })
  public currentLocalizedText: LocalizedText

  @deco.AfterCreate()
  public async createDefaultLocalizedText(this: Room) {
    await this.createAssociation('localizedTexts', { locale: 'en-US', title: this.type })
  }
}
