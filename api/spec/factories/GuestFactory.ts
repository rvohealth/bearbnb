import { UpdateableProperties } from '@rvoh/dream'
import Guest from '../../src/app/models/Guest.js'
import createUser from './UserFactory.js'

export default async function createGuest(attrs: UpdateableProperties<Guest> = {}) {
  attrs.user ??= await createUser()
  return await Guest.create(attrs)
}
