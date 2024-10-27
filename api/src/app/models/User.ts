import { DreamColumn } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'
import Guest from './Guest'
import Host from './Host'

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

  @User.HasOne('Guest')
  public guest: Guest

  @User.HasOne('Host')
  public host: Host
}
