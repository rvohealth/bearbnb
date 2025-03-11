import { UpdateableProperties } from '@rvoh/dream'
import Host from '../../src/app/models/Host'
import createUser from './UserFactory'

export default async function createHost(attrs: UpdateableProperties<Host> = {}) {
  attrs.user ||= await createUser()
  return await Host.create(attrs)
}
