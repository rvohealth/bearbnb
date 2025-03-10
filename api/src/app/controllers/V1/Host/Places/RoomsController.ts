import { OpenAPI } from '@rvohealth/psychic'
import V1HostPlacesBaseController from './BaseController'
import Room from '../../../../models/Room'

const openApiTags = ['rooms']

export default class V1HostPlacesRoomsController extends V1HostPlacesBaseController {
  @OpenAPI(Room, {
    status: 201,
    tags: openApiTags,
    description: 'Create a Room',
  })
  public async create() {
    //    const room = await this.currentUser.createAssociation('rooms', this.paramsFor(Room))
    //    this.created(room)
  }

  @OpenAPI(Room, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch multiple Rooms',
    many: true,
    serializerKey: 'summary',
  })
  public async index() {
    //    const rooms = await this.currentUser.associationQuery('rooms').all()
    //    this.ok(rooms)
  }

  @OpenAPI(Room, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch a Room',
  })
  public async show() {
    //    const room = await this.room()
    //    this.ok(room)
  }

  @OpenAPI(Room, {
    status: 204,
    tags: openApiTags,
    description: 'Update a Room',
  })
  public async update() {
    //    const room = await this.room()
    //    await room.update(this.paramsFor(Room))
    //    this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a Room',
  })
  public async destroy() {
    //    const room = await this.room()
    //    await room.destroy()
    //    this.noContent()
  }

  private async room() {
    // return await this.currentUser.associationQuery('rooms').findOrFail(
    //   this.castParam('id', 'string')
    // )
  }
}
