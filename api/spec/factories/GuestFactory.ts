import { UpdateableProperties } from '@rvoh/dream'
import Guest from '@models/Guest.js'
import createUser from '@spec/factories/UserFactory.js'

export default async function createGuest(attrs: UpdateableProperties<Guest> = {}) {
  return await Guest.create({
    user: attrs.user ? null : await createUser(),
    ...attrs,
  })
}
