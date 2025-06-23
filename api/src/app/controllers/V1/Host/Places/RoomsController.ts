import { OpenAPI } from '@rvoh/psychic'
import { RoomTypesEnumValues } from '../../../../../types/db.js'
import Room from '../../../../models/Room.js'
import Bathroom from '../../../../models/Room/Bathroom.js'
import Bedroom from '../../../../models/Room/Bedroom.js'
import Den from '../../../../models/Room/Den.js'
import Kitchen from '../../../../models/Room/Kitchen.js'
import LivingRoom from '../../../../models/Room/LivingRoom.js'
import V1HostPlacesBaseController from './BaseController.js'

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
    const rooms = await this.currentPlace.associationQuery('rooms').preloadFor('summary').all()
    this.ok(rooms)
  }

  @OpenAPI(Room, {
    status: 200,
    tags: openApiTags,
    description: 'Fetch a Room',
  })
  public async show() {
    const room = await this.room()
    this.ok(room)
  }

  @OpenAPI(Room, {
    status: 201,
    tags: openApiTags,
    description: 'Create a Room',
  })
  public async create() {
    let room: Room
    switch (this.castParam('type', 'string', { enum: RoomTypesEnumValues })) {
      case 'Bathroom':
        room = await Bathroom.create({ place: this.currentPlace, ...this.paramsFor(Room) })
        break

      case 'Bedroom':
        room = await Bedroom.create({ place: this.currentPlace, ...this.paramsFor(Room) })
        break

      case 'Den':
        room = await Den.create({ place: this.currentPlace, ...this.paramsFor(Room) })
        break

      case 'Kitchen':
        room = await Kitchen.create({ place: this.currentPlace, ...this.paramsFor(Room) })
        break

      case 'LivingRoom':
        room = await LivingRoom.create({ place: this.currentPlace, ...this.paramsFor(Room) })
        break
    }

    if (room.isPersisted) room = await room.loadFor('default').execute()
    this.created(room)
  }

  @OpenAPI(Room, {
    status: 204,
    tags: openApiTags,
    description: 'Update a Room',
  })
  public async update() {
    const room = await this.room()
    await room.update(this.paramsFor(Room))
    this.noContent()
  }

  @OpenAPI({
    status: 204,
    tags: openApiTags,
    description: 'Destroy a Room',
  })
  public async destroy() {
    const room = await this.room()
    await room.destroy()
    this.noContent()
  }

  private async room() {
    return await this.currentPlace
      .associationQuery('rooms')
      .preloadFor('default')
      .findOrFail(this.castParam('id', 'string'))
  }
}
