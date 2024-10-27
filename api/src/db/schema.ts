import { CalendarDate } from '@rvohealth/dream'
import { DateTime } from 'luxon'


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
      user: {
        type: 'BelongsTo',
        foreignKey: null,
        tables: ['users'],
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
      
    },
  },
} as const

export const globalSchema = {
  passthroughColumns: [],
  allDefaultScopeNames: [],
  globalNames: {
    models: {
      'Guest': 'guests',
      'User': 'users'
    },
    serializers: ['GuestSerializer', 'GuestSummarySerializer'],
  },
} as const
