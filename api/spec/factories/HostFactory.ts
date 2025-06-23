import { UpdateableProperties } from '@rvoh/dream'
import Host from '../../src/app/models/Host.js'
import createUser from './UserFactory.js'

export default async function createHost(attrs: UpdateableProperties<Host> = {}) {
  return await Host.create({
    user: attrs.user ? null : await createUser(),
    ...attrs,
  })
}
