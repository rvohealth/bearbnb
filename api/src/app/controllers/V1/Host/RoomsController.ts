import { OpenAPI } from '@rvohealth/psychic'
import V1HostBaseController from './BaseController'
import RoomBase from '../../../models/Room/Base'

const openApiTags = ['room-bases']

export default class V1HostRoomsController extends V1HostBaseController {
  @OpenAPI(RoomBase, {
    status: 201,
    tags: openApiTags,
    description: 'Create a RoomBase',
  })
  public async create() {
    //    const roomBase = await this.currentUser.createAssociation('roomBases', this.paramsFor(RoomBase))
    //    this.created(roomBase)
  }

  @OpenAPI(RoomBase, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch multiple RoomBases',
    many: true,
    serializerKey: 'summary',
  })
  public async index() {
    //    const roomBases = await this.currentUser.associationQuery('roomBases').all()
    //    this.ok(roomBases)
  }

  @OpenAPI(RoomBase, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch a RoomBase',
  })
  public async show() {
    //    const roomBase = await this.roomBase()
    //    this.ok(roomBase)
  }

  @OpenAPI(RoomBase, {
    status: 204,
    tags: openApiTags,
    description: 'Update a RoomBase',
  })
  public async update() {
    //    const roomBase = await this.roomBase()
    //    await roomBase.update(this.paramsFor(RoomBase))
    //    this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a RoomBase',
  })
  public async destroy() {
    //    const roomBase = await this.roomBase()
    //    await roomBase.destroy()
    //    this.noContent()
  }

  private async roomBase() {
    return await this.currentUser.associationQuery('roomBases').findOrFail(
      this.castParam('id', 'string')
    )
  }
}
