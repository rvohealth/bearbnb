import { OpenAPI } from '@rvohealth/psychic'
import RoomBase from '../../../../models/Room/Base'
import V1HostBaseController from '../BaseController'

const openApiTags = ['room-bases']

export default class V1HostRoomsController extends V1HostBaseController {
  @OpenAPI(RoomBase, {
    status: 201,
    tags: openApiTags,
    description: 'Create a RoomBase',
  })
  public async create() {
    const place = await this.place()
    const room = await place.createAssociation('rooms', this.paramsFor(RoomBase))
    this.created(await RoomBase.findOrFail(room.id))
  }

  @OpenAPI(RoomBase, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch multiple RoomBases',
    many: true,
    serializerKey: 'summary',
  })
  public async index() {
    const rooms = await this.placeRoomQuery.all()
    this.ok(rooms)
  }

  @OpenAPI(RoomBase, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch a RoomBase',
  })
  public async show() {
    const room = await this.room()
    this.ok(room)
  }

  @OpenAPI(RoomBase, {
    status: 204,
    tags: openApiTags,
    description: 'Update a RoomBase',
  })
  public async update() {
    // const room = await this.room()
    // await room.update(this.paramsFor(RoomBase))
    // this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a RoomBase',
  })
  public async destroy() {
    //    const room = await this.room()
    //    await room.destroy()
    //    this.noContent()
  }

  private async place() {
    return await this.currentHost
      .associationQuery('places', { id: this.castParam('placeId', 'string') })
      .firstOrFail()
  }

  private async room() {
    return await this.placeRoomQuery.findOrFail(this.castParam('id', 'string'))
  }

  private get placeRoomQuery() {
    return this.currentHost.associationQuery('rooms', { placeId: this.castParam('placeId', 'string') })
  }
}
