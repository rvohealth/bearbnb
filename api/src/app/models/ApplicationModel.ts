import { Dream } from '@rvoh/dream'
import { DB } from '@src/types/db.js'
import { globalTypeConfig } from '@src/types/dream.globals.js'
import { connectionTypeConfig, schema } from '@src/types/dream.js'

export default class ApplicationModel extends Dream {
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
}
