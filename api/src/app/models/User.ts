import ApplicationModel from '@models/ApplicationModel.js'
import { Decorators } from '@rvoh/dream'
import { DreamColumn } from '@rvoh/dream/types'
import Guest from './Guest.js'

const deco = new Decorators<typeof User>()

export default class User extends ApplicationModel {
  public override get table() {
    return 'users' as const
  }

  public id: DreamColumn<User, 'id'>
  public email: DreamColumn<User, 'email'>
  public createdAt: DreamColumn<User, 'createdAt'>
  public updatedAt: DreamColumn<User, 'updatedAt'>

  @deco.AfterCreate()
  public async createGuest(this: User) {
    this.guest = await this.createAssociation('guest')
  }

  @deco.HasOne('Guest')
  public guest: Guest
}
