import ApplicationModel from '@models/ApplicationModel.js'
import Guest from '@models/Guest.js'
import Host from '@models/Host.js'
import { Decorators, DreamColumn } from '@rvoh/dream'

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

  @deco.HasOne('Host')
  public host: Host
}
