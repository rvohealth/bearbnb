import { UpdateableProperties } from '@rvoh/dream/types'
import Host from '@models/Host.js'
import createUser from '@spec/factories/UserFactory.js'

export default async function createHost(attrs: UpdateableProperties<Host> = {}) {
  return await Host.create({
    user: attrs.user ? null : await createUser(),
    ...attrs,
  })
}
