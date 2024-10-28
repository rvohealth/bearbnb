import { DreamColumn, DreamSerializers, SoftDelete } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import Host from './Host'
import Place from './Place'
import RoomBase from './Room/Base'

@SoftDelete()
export default class LocalizedText extends ApplicationModel {
  public get table() {
    return 'localized_texts' as const
  }

  public get serializers(): DreamSerializers<LocalizedText> {
    return {
      default: 'LocalizedTextSerializer',
      summary: 'LocalizedTextSummarySerializer',
    }
  }

  public id: DreamColumn<LocalizedText, 'id'>
  public locale: DreamColumn<LocalizedText, 'locale'>
  public title: DreamColumn<LocalizedText, 'title'>
  public markdown: DreamColumn<LocalizedText, 'markdown'>
  public deletedAt: DreamColumn<LocalizedText, 'deletedAt'>
  public createdAt: DreamColumn<LocalizedText, 'createdAt'>
  public updatedAt: DreamColumn<LocalizedText, 'updatedAt'>

  @LocalizedText.BelongsTo(['Host', 'Place', 'Room/Base'], {
    polymorphic: true,
    foreignKey: 'localizableId',
  })
  public localizable: Host | Place | RoomBase
  public localizableId: DreamColumn<LocalizedText, 'localizableId'>
  public localizableType: DreamColumn<LocalizedText, 'localizableType'>
}
