import { CalendarDate } from '@rvohealth/dream'
import { DateTime } from 'luxon'
import {
  ApplianceTypesEnum,
  ApplianceTypesEnumValues,
  BathOrShowerTypesEnum,
  BathOrShowerTypesEnumValues,
  BedTypesEnum,
  BedTypesEnumValues,
  IdType,
  PlaceStylesEnum,
  PlaceStylesEnumValues,
  RoomTypesEnum,
  RoomTypesEnumValues
} from './sync'

export const schema = {
  guests: {
    primaryKey: 'id',
    createdAtField: 'createdAt',
    updatedAtField: 'updatedAt',
    deletedAtField: 'deletedAt',
    serializerKeys: ['default', 'summary'],
    scopes: {
      default: [],
      named: [],
    },
    columns: {
      createdAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      userId: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      stays: {
        type: 'HasMany',
        foreignKey: 'guestId',
        tables: ['stays'],
        optional: null,
        requiredWhereClauses: null,
      },
      user: {
        type: 'BelongsTo',
        foreignKey: 'userId',
        tables: ['users'],
        optional: false,
        requiredWhereClauses: null,
      },
    },
  },
  host_places: {
    primaryKey: 'id',
    createdAtField: 'createdAt',
    updatedAtField: 'updatedAt',
    deletedAtField: 'deletedAt',
    serializerKeys: [],
    scopes: {
      default: [],
      named: [],
    },
    columns: {
      createdAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      deletedAt: {
        coercedType: {} as DateTime | null,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: true,
        isArray: false,
      },
      hostId: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      placeId: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      host: {
        type: 'BelongsTo',
        foreignKey: 'hostId',
        tables: ['hosts'],
        optional: false,
        requiredWhereClauses: null,
      },
      place: {
        type: 'BelongsTo',
        foreignKey: 'placeId',
        tables: ['places'],
        optional: false,
        requiredWhereClauses: null,
      },
    },
  },
  hosts: {
    primaryKey: 'id',
    createdAtField: 'createdAt',
    updatedAtField: 'updatedAt',
    deletedAtField: 'deletedAt',
    serializerKeys: ['default', 'summary'],
    scopes: {
      default: [],
      named: [],
    },
    columns: {
      createdAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      userId: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      hostPlaces: {
        type: 'HasMany',
        foreignKey: 'hostId',
        tables: ['host_places'],
        optional: null,
        requiredWhereClauses: null,
      },
      places: {
        type: 'HasMany',
        foreignKey: null,
        tables: ['places'],
        optional: null,
        requiredWhereClauses: null,
      },
      rooms: {
        type: 'HasMany',
        foreignKey: null,
        tables: ['rooms'],
        optional: null,
        requiredWhereClauses: null,
      },
      user: {
        type: 'BelongsTo',
        foreignKey: 'userId',
        tables: ['users'],
        optional: false,
        requiredWhereClauses: null,
      },
    },
  },
  places: {
    primaryKey: 'id',
    createdAtField: 'createdAt',
    updatedAtField: 'updatedAt',
    deletedAtField: 'deletedAt',
    serializerKeys: ['default', 'summary'],
    scopes: {
      default: ['dream:SoftDelete'],
      named: [],
    },
    columns: {
      createdAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      deletedAt: {
        coercedType: {} as DateTime | null,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: true,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      name: {
        coercedType: {} as string,
        enumType: null,
        enumValues: null,
        dbType: 'citext',
        allowNull: false,
        isArray: false,
      },
      style: {
        coercedType: {} as PlaceStylesEnum,
        enumType: {} as PlaceStylesEnum,
        enumValues: PlaceStylesEnumValues,
        dbType: 'place_styles_enum',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      hostPlaces: {
        type: 'HasMany',
        foreignKey: 'placeId',
        tables: ['host_places'],
        optional: null,
        requiredWhereClauses: null,
      },
      rooms: {
        type: 'HasMany',
        foreignKey: 'placeId',
        tables: ['rooms'],
        optional: null,
        requiredWhereClauses: null,
      },
    },
  },
  rooms: {
    primaryKey: 'id',
    createdAtField: 'createdAt',
    updatedAtField: 'updatedAt',
    deletedAtField: 'deletedAt',
    serializerKeys: ['default', 'summary'],
    scopes: {
      default: [],
      named: [],
    },
    columns: {
      appliances: {
        coercedType: {} as ApplianceTypesEnum[],
        enumType: {} as ApplianceTypesEnum,
        enumValues: ApplianceTypesEnumValues,
        dbType: 'appliance_types_enum[]',
        allowNull: false,
        isArray: true,
      },
      bathOrShowerType: {
        coercedType: {} as BathOrShowerTypesEnum | null,
        enumType: {} as BathOrShowerTypesEnum,
        enumValues: BathOrShowerTypesEnumValues,
        dbType: 'bath_or_shower_types_enum',
        allowNull: true,
        isArray: false,
      },
      bedTypes: {
        coercedType: {} as BedTypesEnum[],
        enumType: {} as BedTypesEnum,
        enumValues: BedTypesEnumValues,
        dbType: 'bed_types_enum[]',
        allowNull: false,
        isArray: true,
      },
      createdAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      deletedAt: {
        coercedType: {} as DateTime | null,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: true,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      numberOfBeds: {
        coercedType: {} as number | null,
        enumType: null,
        enumValues: null,
        dbType: 'integer',
        allowNull: true,
        isArray: false,
      },
      placeId: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      position: {
        coercedType: {} as number | null,
        enumType: null,
        enumValues: null,
        dbType: 'integer',
        allowNull: true,
        isArray: false,
      },
      type: {
        coercedType: {} as RoomTypesEnum,
        enumType: {} as RoomTypesEnum,
        enumValues: RoomTypesEnumValues,
        dbType: 'room_types_enum',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      place: {
        type: 'BelongsTo',
        foreignKey: 'placeId',
        tables: ['places'],
        optional: false,
        requiredWhereClauses: null,
      },
    },
  },
  stays: {
    primaryKey: 'id',
    createdAtField: 'createdAt',
    updatedAtField: 'updatedAt',
    deletedAtField: 'deletedAt',
    serializerKeys: ['default', 'summary'],
    scopes: {
      default: [],
      named: [],
    },
    columns: {
      adults: {
        coercedType: {} as number,
        enumType: null,
        enumValues: null,
        dbType: 'integer',
        allowNull: false,
        isArray: false,
      },
      checkinOn: {
        coercedType: {} as CalendarDate,
        enumType: null,
        enumValues: null,
        dbType: 'date',
        allowNull: false,
        isArray: false,
      },
      checkoutOn: {
        coercedType: {} as CalendarDate,
        enumType: null,
        enumValues: null,
        dbType: 'date',
        allowNull: false,
        isArray: false,
      },
      createdAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      cubs: {
        coercedType: {} as number,
        enumType: null,
        enumValues: null,
        dbType: 'integer',
        allowNull: false,
        isArray: false,
      },
      guestId: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      placeId: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      guest: {
        type: 'BelongsTo',
        foreignKey: 'guestId',
        tables: ['guests'],
        optional: false,
        requiredWhereClauses: null,
      },
      place: {
        type: 'BelongsTo',
        foreignKey: 'placeId',
        tables: ['places'],
        optional: false,
        requiredWhereClauses: null,
      },
    },
  },
  users: {
    primaryKey: 'id',
    createdAtField: 'createdAt',
    updatedAtField: 'updatedAt',
    deletedAtField: 'deletedAt',
    serializerKeys: [],
    scopes: {
      default: [],
      named: [],
    },
    columns: {
      createdAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      email: {
        coercedType: {} as string,
        enumType: null,
        enumValues: null,
        dbType: 'citext',
        allowNull: false,
        isArray: false,
      },
      firstName: {
        coercedType: {} as string,
        enumType: null,
        enumValues: null,
        dbType: 'character varying',
        allowNull: false,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      lastName: {
        coercedType: {} as string,
        enumType: null,
        enumValues: null,
        dbType: 'character varying',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      guest: {
        type: 'HasOne',
        foreignKey: 'userId',
        tables: ['guests'],
        optional: null,
        requiredWhereClauses: null,
      },
      host: {
        type: 'HasOne',
        foreignKey: 'userId',
        tables: ['hosts'],
        optional: null,
        requiredWhereClauses: null,
      },
    },
  },
} as const

export const globalSchema = {
  passthroughColumns: [],
  allDefaultScopeNames: ['dream:SoftDelete'],
  globalNames: {
    models: {
      'Guest': 'guests',
      'Host': 'hosts',
      'HostPlace': 'host_places',
      'Place': 'places',
      'Room/Base': 'rooms',
      'Room/Bathroom': 'rooms',
      'Room/Bedroom': 'rooms',
      'Room/Den': 'rooms',
      'Room/Kitchen': 'rooms',
      'Room/LivingRoom': 'rooms',
      'Stay': 'stays',
      'User': 'users'
    },
    serializers: [
      'GuestSerializer',
      'GuestSummarySerializer',
      'HostSerializer',
      'HostSummarySerializer',
      'PlaceSerializer',
      'PlaceSummarySerializer',
      'Room/BaseSerializer',
      'Room/BaseSummarySerializer',
      'Room/BathroomSerializer',
      'Room/BathroomSummarySerializer',
      'Room/BedroomSerializer',
      'Room/BedroomSummarySerializer',
      'Room/DenSerializer',
      'Room/DenSummarySerializer',
      'Room/KitchenSerializer',
      'Room/KitchenSummarySerializer',
      'Room/LivingRoomSerializer',
      'Room/LivingRoomSummarySerializer',
      'StaySerializer',
      'StaySummarySerializer'
    ],
  },
} as const
