import { BaseBackgroundedModel } from '@rvoh/psychic-workers'
import { BackgroundJobConfig } from '@rvoh/psychic-workers/types'
import { DBClass } from '@src/types/db.js'
import { globalTypeConfig } from '@src/types/dream.globals.js'
import { connectionTypeConfig, schema } from '@src/types/dream.js'
import psychicTypes from '@src/types/psychic.js'

export default class ApplicationBackgroundedModel extends BaseBackgroundedModel {
  public declare DB: DBClass

  public override get schema() {
    return schema
  }

  public override get connectionTypeConfig() {
    return connectionTypeConfig
  }

  public override get globalTypeConfig() {
    return globalTypeConfig
  }

  public override get psychicTypes() {
    return psychicTypes
  }

  public static override get backgroundJobConfig(): BackgroundJobConfig<BaseBackgroundedModel> {
    return {}
  }
}
