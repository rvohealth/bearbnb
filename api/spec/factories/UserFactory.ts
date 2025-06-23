import { UpdateableProperties } from '@rvoh/dream'
import User from '../../src/app/models/User.js'

let counter = 0

export default async function createUser(attrs: UpdateableProperties<User> = {}) {
  return await User.create({
    email: `User email ${++counter}`,
    firstName: `User firstName ${counter}`,
    lastName: `User lastName ${counter}`,
    ...attrs,
  })
}
