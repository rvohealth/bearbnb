import { BaseBackgroundedModel } from '@rvoh/psychic-workers'
import { BackgroundJobConfig } from '@rvoh/psychic-workers/types'
import { DB } from '@src/types/db.js'
import { globalTypeConfig } from '@src/types/dream.globals.js'
import { connectionTypeConfig, schema } from '@src/types/dream.js'
import psychicWorkerTypes from '@src/types/workers.js'

export default class ApplicationBackgroundedModel extends BaseBackgroundedModel {
  declare public DB: DB

  public override get schema() {
    return schema
  }

  public override get connectionTypeConfig() {
    return connectionTypeConfig
  }

  public override get globalTypeConfig() {
    return globalTypeConfig
  }

  public override get psychicWorkerTypes() {
    return psychicWorkerTypes
  }

  public static override get backgroundJobConfig(): BackgroundJobConfig<BaseBackgroundedModel> {
    return {}
  }
}
