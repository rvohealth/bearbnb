import ApplicationModel from '@models/ApplicationModel.js'
import { untypedDb } from '@rvoh/dream/db'
import { DbConnectionType } from '@rvoh/dream/types'

export default function db(connectionType: DbConnectionType = 'primary', connectionName: string = 'default') {
  return untypedDb<ApplicationModel>(connectionName, connectionType)
}
