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
      /**
       * `type` is normally a protected attribute, but when creating a room, we do want the user
       * to be able to select room type, we just have to handle it explicitly since it won't be
       * returned by `paramsFor` (and we don't want it to be since simply setting the type would
       * not be operating on the correct model, even though the correct model would be hydrated
       * when loading from the database)
       */
      including: ['type'],
    },
  })
  public async create() {
    let room: Room
    const roomType = this.castParam('type', 'string', { enum: RoomTypesEnumValues })

    // paramsFor is based on the table (even virtual attributes are associated with
    // the table at the type level), so passing the STI children to paramsFor
    // would not alter the results
    const roomParams = this.paramsFor(Room)

    switch (roomType) {
      case 'Bathroom':
        room = await Bathroom.create({ place: this.currentPlace, ...roomParams })
        break

      case 'Bedroom':
        room = await Bedroom.create({ place: this.currentPlace, ...roomParams })
        break

      case 'Den':
        room = await Den.create({ place: this.currentPlace, ...roomParams })
        break

      case 'Kitchen':
        room = await Kitchen.create({ place: this.currentPlace, ...roomParams })
        break

      case 'LivingRoom':
        room = await LivingRoom.create({ place: this.currentPlace, ...roomParams })
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
