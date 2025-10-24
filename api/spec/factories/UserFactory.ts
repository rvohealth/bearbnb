import { UpdateableProperties } from '@rvoh/dream/types'
import User from '@models/User.js'

let counter = 0

export default async function createUser(attrs: UpdateableProperties<User> = {}) {
  return await User.create({
    email: `User email ${++counter}`,
    ...attrs,
  })
}
