import { BackgroundJobConfig, BaseBackgroundedModel } from '@rvoh/psychic-workers'
import { DBClass } from '../../types/db.js'
import { globalSchema, schema } from '../../types/dream.js'
import psychicTypes from '../../types/psychic.js'

export default class ApplicationBackgroundedModel extends BaseBackgroundedModel {
  public declare DB: DBClass

  public static override get backgroundJobConfig(): BackgroundJobConfig<BaseBackgroundedModel> {
    return {}
  }

  public override get schema() {
    return schema
  }

  public override get globalSchema() {
    return globalSchema
  }

  public override get psychicTypes() {
    return psychicTypes
  }
}
