import { OpenAPI } from '@rvoh/psychic'
import V1HostPlacesBaseController from './BaseController.js'
import Room from '../../../../models/Room.js'

const openApiTags = ['rooms']

export default class V1HostPlacesRoomsController extends V1HostPlacesBaseController {
  @OpenAPI(Room, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch multiple Rooms',
    many: true,
    serializerKey: 'summary',
  })
  public async index() {
    // const rooms = await this.currentPlace.associationQuery('rooms')
    //   .preloadFor('summary')
    //   .all()
    // this.ok(rooms)
  }

  @OpenAPI(Room, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch a Room',
  })
  public async show() {
    // const room = await this.room()
    // this.ok(room)
  }

  @OpenAPI(Room, {
    status: 201,
    tags: openApiTags,
    description: 'Create a Room',
  })
  public async create() {
    // let room = await this.currentPlace.createAssociation('rooms', this.paramsFor(Room))
    // if (room.isPersisted) room = await room.loadFor('default').execute()
    // this.created(room)
  }

  @OpenAPI(Room, {
    status: 204,
    tags: openApiTags,
    description: 'Update a Room',
  })
  public async update() {
    // const room = await this.room()
    // await room.update(this.paramsFor(Room))
    // this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a Room',
  })
  public async destroy() {
    // const room = await this.room()
    // await room.destroy()
    // this.noContent()
  }

  private async room() {
    // return await this.currentPlace.associationQuery('rooms')
    //   .preloadFor('default')
    //   .findOrFail(this.castParam('id', 'string'))
  }
}
