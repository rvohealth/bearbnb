import { Attribute, DreamColumn, DreamSerializer } from '@rvoh/dream'
import LocalizedText from '../models/LocalizedText'

export class LocalizedTextSummarySerializer<
  DataType extends LocalizedText,
  Passthrough extends object,
> extends DreamSerializer<DataType, Passthrough> {
  @Attribute(LocalizedText)
  public id: DreamColumn<LocalizedText, 'id'>
}

export default class LocalizedTextSerializer<
  DataType extends LocalizedText,
  Passthrough extends object,
> extends LocalizedTextSummarySerializer<DataType, Passthrough> {
  @Attribute(LocalizedText)
  public localizableType: DreamColumn<LocalizedText, 'localizableType'>

  @Attribute(LocalizedText)
  public localizableId: DreamColumn<LocalizedText, 'localizableId'>

  @Attribute(LocalizedText)
  public locale: DreamColumn<LocalizedText, 'locale'>

  @Attribute(LocalizedText)
  public title: DreamColumn<LocalizedText, 'title'>

  @Attribute(LocalizedText)
  public markdown: DreamColumn<LocalizedText, 'markdown'>

  @Attribute(LocalizedText)
  public deletedAt: DreamColumn<LocalizedText, 'deletedAt'>
}
