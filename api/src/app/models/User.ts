import { DreamColumn } from '@rvohealth/dream'
import ApplicationModel from './ApplicationModel'

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
}
