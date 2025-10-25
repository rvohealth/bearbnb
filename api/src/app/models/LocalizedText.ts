import ApplicationModel from '@models/ApplicationModel.js'
import Host from '@models/Host.js'
import Place from '@models/Place.js'
import Room from '@models/Room.js'
import { Decorators, SoftDelete } from '@rvoh/dream'
import { DreamColumn, DreamSerializers } from '@rvoh/dream/types'

const deco = new Decorators<typeof LocalizedText>()

@SoftDelete()
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

  @deco.BelongsTo(['Host', 'Place', 'Room'], { polymorphic: true, on: 'localizableId' })
  public localizable: Host | Place | Room
}
