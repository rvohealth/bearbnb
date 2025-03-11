import { Decorators, DreamColumn, DreamSerializers, SoftDelete } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel'
import Host from './Host'
import Place from './Place'
import Room from './Room'

const Deco = new Decorators<InstanceType<typeof LocalizedText>>()

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
  public localizableType: DreamColumn<LocalizedText, 'localizableType'>
  public localizableId: DreamColumn<LocalizedText, 'localizableId'>
  public locale: DreamColumn<LocalizedText, 'locale'>
  public title: DreamColumn<LocalizedText, 'title'>
  public markdown: DreamColumn<LocalizedText, 'markdown'>
  public deletedAt: DreamColumn<LocalizedText, 'deletedAt'>
  public createdAt: DreamColumn<LocalizedText, 'createdAt'>
  public updatedAt: DreamColumn<LocalizedText, 'updatedAt'>

  @Deco.BelongsTo(['Host', 'Place', 'Room'], { polymorphic: true, foreignKey: 'localizableId' })
  public localizable: Host | Place | Room
}
