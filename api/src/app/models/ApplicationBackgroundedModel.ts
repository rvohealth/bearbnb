import { BackgroundJobConfig, BaseBackgroundedModel } from '@rvohealth/psychic-workers'
import { DBClass } from '../../types/db'
import { globalSchema, schema } from '../../types/dream'
import psychicTypes from '../../types/psychic'

export default class ApplicationBackgroundedModel extends BaseBackgroundedModel {
  public DB: DBClass

  public static get backgroundJobConfig(): BackgroundJobConfig<BaseBackgroundedModel> {
    return {}
  }

  public get schema() {
    return schema
  }

  public get globalSchema() {
    return globalSchema
  }

  public get psychicTypes() {
    return psychicTypes
  }
}
