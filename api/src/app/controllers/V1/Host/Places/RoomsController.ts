import Room from '@models/Room.js'
import Bathroom from '@models/Room/Bathroom.js'
import Bedroom from '@models/Room/Bedroom.js'
import Den from '@models/Room/Den.js'
import Kitchen from '@models/Room/Kitchen.js'
import LivingRoom from '@models/Room/LivingRoom.js'
import { OpenAPI } from '@rvoh/psychic'
import { RoomTypesEnumValues } from '@src/types/db.js'
import V1HostPlacesBaseController from './BaseController.js'

const openApiTags = ['rooms']

export default class V1HostPlacesRoomsController extends V1HostPlacesBaseController {
  @OpenAPI(Room, {
    status: 200,
    tags: openApiTags,
    description: 'Paginated index of Rooms',
    scrollPaginate: true,
    serializerKey: 'summary',
  })
  public async index() {
    const rooms = await this.currentPlace
      .associationQuery('rooms')
      .preloadFor('summary')
      .order({ createdAt: 'desc' })
      .scrollPaginate({ cursor: this.castParam('cursor', 'string', { allowNull: true }) })
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
    requestBody: {
      including: ['type'],
    },
  })
  public async create() {
    let room: Room
    const roomType = this.castParam('type', 'string', { enum: RoomTypesEnumValues })

    switch (roomType) {
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

      default: {
        // protection so that if a new RoomTypesEnum is ever added, this will throw a type
        // error at build time until a case is added to handle that new RoomTypesEnum
        const _never: never = roomType

        // even though this should never happen due to the type protection, throw an error to satisfy later types
        throw new Error(`Unhandled RoomTypesEnum: ${_never as string}`)
      }
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
