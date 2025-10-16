import ApplicationModel from '@models/ApplicationModel.js'
import { DbConnectionType, untypedDb } from '@rvoh/dream'

export default function db(connectionType: DbConnectionType = 'primary', connectionName: string = 'default') {
  return untypedDb<ApplicationModel>(connectionName, connectionType)
}
