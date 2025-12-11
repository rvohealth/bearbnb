import ApplicationModel from '@models/ApplicationModel.js'
import Place from '@models/Place.js'
import { Decorators } from '@rvoh/dream'
import { DreamColumn } from '@rvoh/dream/types'
import LocalizedText from './LocalizedText.js'

const deco = new Decorators<typeof Room>()

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

  @deco.BelongsTo('Place', { on: 'placeId' })
  public place: Place
  public placeId: DreamColumn<Room, 'placeId'>

  @deco.HasMany('LocalizedText', { polymorphic: true, on: 'localizableId', dependent: 'destroy' })
  public localizedTexts: LocalizedText[]

  @deco.AfterCreate()
  public async createDefaultLocalizedText(this: Room) {
    await this.createAssociation('localizedTexts', { locale: 'en-US', title: this.type })
  }
}
