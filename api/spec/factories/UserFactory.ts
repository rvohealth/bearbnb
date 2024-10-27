import { UpdateableProperties } from '@rvohealth/dream'
import User from '../../src/app/models/User'

let counter = 0

export default async function createUser(attrs: UpdateableProperties<User> = {}) {
  attrs.firstName ||= `User firstName ${++counter}`
  attrs.lastName ||= `User lastName ${counter}`
  return await User.create(attrs)
}
