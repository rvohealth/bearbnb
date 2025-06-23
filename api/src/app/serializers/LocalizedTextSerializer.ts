import { DreamSerializer } from '@rvoh/dream'
import LocalizedText from '../models/LocalizedText.js'

export const LocalizedTextSummarySerializer = (localizedText: LocalizedText) =>
  DreamSerializer(LocalizedText, localizedText)
    .attribute('id')

export const LocalizedTextSerializer = (localizedText: LocalizedText) =>
  LocalizedTextSummarySerializer(localizedText)
    .attribute('localizableType')
    .attribute('localizableId')
    .attribute('locale')
    .attribute('title')
    .attribute('markdown')
    .attribute('deletedAt')
