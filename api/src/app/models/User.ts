import { Decorators, DreamColumn } from '@rvoh/dream'
import ApplicationModel from './ApplicationModel'
import Guest from './Guest'
import Host from './Host'

const Deco = new Decorators<InstanceType<typeof User>>()

export default class User extends ApplicationModel {
  public get table() {
    return 'users' as const
  }

  public id: DreamColumn<User, 'id'>
  public email: DreamColumn<User, 'email'>
  public firstName: DreamColumn<User, 'firstName'>
  public lastName: DreamColumn<User, 'lastName'>
  public createdAt: DreamColumn<User, 'createdAt'>
  public updatedAt: DreamColumn<User, 'updatedAt'>

  @Deco.HasOne('Guest')
  public guest: Guest | null

  @Deco.HasOne('Host')
  public host: Host | null
}
