import { specRequest } from '@rvoh/psychic-spec-helpers'
import User from '../../../src/app/models/User.js'

export default async function addEndUserAuthHeader(request: typeof specRequest, user: User, headers: object) {
  // Update this function to either modify headers (e.g. with an Authorization header)
  // or to apply a cookie to the request
  return { ...headers }
}
