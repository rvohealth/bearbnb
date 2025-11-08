import { Decorators } from '@rvoh/dream'
import { DreamColumn } from '@rvoh/dream/types'
import ApplicationModel from '@models/ApplicationModel.js'

const deco = new Decorators<typeof User>()

export default class User extends ApplicationModel {
  public override get table() {
    return 'users' as const
  }

  public id: DreamColumn<User, 'id'>
  public email: DreamColumn<User, 'email'>
  public createdAt: DreamColumn<User, 'createdAt'>
  public updatedAt: DreamColumn<User, 'updatedAt'>
}
