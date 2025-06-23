import Guest from '../../../src/app/models/Guest.js'
import createUser from '../../factories/UserFactory.js'

describe('User', () => {
  context('upon creation', () => {
    it('creates a guest for this user and brings it into scope on the newly created user', async () => {
      const user = await createUser()

      expect(user.guest instanceof Guest).toBe(true)
      const guest = await user.associationQuery('guest').first()
      expect(guest instanceof Guest).toBe(true)
    })
  })
})
