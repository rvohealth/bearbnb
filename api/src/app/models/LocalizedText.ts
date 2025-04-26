import { Decorators, DreamColumn, DreamSerializers } from '@rvoh/dream'
import { Room } from 'socket.io-adapter'
import ApplicationModel from './ApplicationModel.js'
import Host from './Host.js'
import Place from './Place.js'

const deco = new Decorators<typeof LocalizedText>()

export default class LocalizedText extends ApplicationModel {
  public override get table() {
    return 'localized_texts' as const
  }

  public get serializers(): DreamSerializers<LocalizedText> {
    return {
      default: 'LocalizedTextSerializer',
      summary: 'LocalizedTextSummarySerializer',
    }
  }

  public id: DreamColumn<LocalizedText, 'id'>
  public localizableType: DreamColumn<LocalizedText, 'localizableType'>
  public localizableId: DreamColumn<LocalizedText, 'localizableId'>
  public locale: DreamColumn<LocalizedText, 'locale'>
  public title: DreamColumn<LocalizedText, 'title'>
  public markdown: DreamColumn<LocalizedText, 'markdown'>
  public deletedAt: DreamColumn<LocalizedText, 'deletedAt'>
  public createdAt: DreamColumn<LocalizedText, 'createdAt'>
  public updatedAt: DreamColumn<LocalizedText, 'updatedAt'>

  @deco.BelongsTo(['Host', 'Place', 'Room'], { polymorphic: true, foreignKey: 'localizableId' })
  public localizable: Host | Place | Room
}
