
/*
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
      BEGIN AUTOGENERATED MESSAGE
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--



      ,▄█▄                                               
    ]█▄▄                         ╓█████▌                 
    ▐██████▄                   ▄█████▓╣█                 
     ║████████▄,  ,  ,,▄,▄▄▄▓██████╬╬╣╣▌                 
      ╚███╣██████████▓▓▓▓██████████╩╠╬▓                  
       ╙█╬╬╬▓███████████████████████▒▓▌                  
        ╙▓█▓██████████████████████████                   
         ╚██████▀███████████╩█▓▌▐▓████▄                  
         '║█████`╣█Γ║████████▄▄φ▓█████▌                  
          ║█████████████████████▓█████▌                  
           █████████████▓▓████████████                   
           ║█████████████████████████                    
          ]█████████████████████████                     
         ,▓██████████████████████████                    
        ▓█████████████████████████████µ                  
       ▐███████████████████████████████▄▄                
       ║█████████████████████████████████╬╬╣▓            
   ,╔╦║███████████████████████████████████▓╬╬╣           
,≥≥⌠░░░╠▓████████████████████████████████████▓▓          
,;=-',▄█████████████████████████████████████████▓        
                                                         
                                                         
                                                         
  ██████╗ ███████╗██╗   ██╗ ██████╗██╗  ██╗██╗ ██████╗   
  ██╔══██╗██╔════╝╚██╗ ██╔╝██╔════╝██║  ██║██║██╔════╝   
  ██████╔╝███████╗ ╚████╔╝ ██║     ███████║██║██║        
  ██╔═══╝ ╚════██║  ╚██╔╝  ██║     ██╔══██║██║██║        
  ██║     ███████║   ██║   ╚██████╗██║  ██║██║╚██████╗   
  ╚═╝     ╚══════╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝ ╚═════╝   
                                                         
                                                         

This file was automatically generated by my cat, Aster.
He does not want you mucking about with his files,
and we are pretty lax on trimming his nails.

I mean, we have him pretty well fenced in but he is an
escape artist and he still manages to get fleas!

My point is, don't go mucking about with his files!

He actually has a hopefully well-tempered message for
us humans, he says:

"
  Dear pathetic humans,

  Here is a haiku to keep you in line

  don't dare go mucking
  with my files, I lyke them fine
  prettierignore
"

Sorry, that's the best we are ganna get from him
when you ask him to add a disclaimer to all
autogenerated files on a SUNDAY, when the sun
is hitting the perfect spot in the living room
for a mid-morning nap! He can get saucy, and he
is looking over my shoulder and would like me to
remind all humans that

"
a.) I have sharp claws.
b.) All laptops are ok sleeping places for your
    cat overlords. when we decide to sleep on
    them, it is because they are our beds, and
    we just loan them out to you so you can go
    out and get us the right food.
"

--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
      END AUTOGENERATED MESSAGE
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--
--#--#--#--#--#--#--#--#--#--#--#--#--#--#--#
#--#--#--#--#--#--#--#--#--#--#--#--#--#--#--

*/

import { CalendarDate } from '@rvoh/dream'
import { DateTime } from 'luxon'
import {
  ApplianceTypesEnum,
  ApplianceTypesEnumValues,
  BathOrShowerTypesEnum,
  BathOrShowerTypesEnumValues,
  BedTypesEnum,
  BedTypesEnumValues,
  IdType,
  LocalesEnum,
  LocalesEnumValues,
  LocalizedTypesEnum,
  LocalizedTypesEnumValues,
  PlaceStylesEnum,
  PlaceStylesEnumValues,
  RoomTypesEnum,
  RoomTypesEnumValues
} from './db'

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
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      userId: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
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
        foreignKey: 'userId',
        tables: ['users'],
        optional: false,
        requiredOnClauses: null,
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
      default: ['dream:SoftDelete'],
      named: [],
    },
    columns: {
      createdAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      deletedAt: {
        coercedType: {} as DateTime | null,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: true,
        isArray: false,
      },
      hostId: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      placeId: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumArrayType: null,
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
        requiredOnClauses: null,
      },
      place: {
        type: 'BelongsTo',
        foreignKey: 'placeId',
        tables: ['places'],
        optional: false,
        requiredOnClauses: null,
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
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      userId: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      currentLocalizedText: {
        type: 'HasOne',
        foreignKey: 'localizableId',
        tables: ['localized_texts'],
        optional: null,
        requiredOnClauses: ['locale'],
      },
      hostPlaces: {
        type: 'HasMany',
        foreignKey: 'hostId',
        tables: ['host_places'],
        optional: null,
        requiredOnClauses: null,
      },
      localizedTexts: {
        type: 'HasMany',
        foreignKey: 'localizableId',
        tables: ['localized_texts'],
        optional: null,
        requiredOnClauses: null,
      },
      places: {
        type: 'HasMany',
        foreignKey: null,
        tables: ['places'],
        optional: null,
        requiredOnClauses: null,
      },
      user: {
        type: 'BelongsTo',
        foreignKey: 'userId',
        tables: ['users'],
        optional: false,
        requiredOnClauses: null,
      },
    },
  },
  localized_texts: {
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
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      deletedAt: {
        coercedType: {} as DateTime | null,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: true,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      locale: {
        coercedType: {} as LocalesEnum,
        enumType: {} as LocalesEnum,
        enumArrayType: [] as LocalesEnum[],
        enumValues: LocalesEnumValues,
        dbType: 'locales_enum',
        allowNull: false,
        isArray: false,
      },
      localizableId: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      localizableType: {
        coercedType: {} as LocalizedTypesEnum,
        enumType: {} as LocalizedTypesEnum,
        enumArrayType: [] as LocalizedTypesEnum[],
        enumValues: LocalizedTypesEnumValues,
        dbType: 'localized_types_enum',
        allowNull: false,
        isArray: false,
      },
      markdown: {
        coercedType: {} as string | null,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'text',
        allowNull: true,
        isArray: false,
      },
      title: {
        coercedType: {} as string | null,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'character varying',
        allowNull: true,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      localizable: {
        type: 'BelongsTo',
        foreignKey: 'localizableId',
        tables: ['hosts', 'places', 'rooms'],
        optional: false,
        requiredOnClauses: null,
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
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      deletedAt: {
        coercedType: {} as DateTime | null,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: true,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      name: {
        coercedType: {} as string,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'citext',
        allowNull: false,
        isArray: false,
      },
      sleeps: {
        coercedType: {} as number,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'integer',
        allowNull: false,
        isArray: false,
      },
      style: {
        coercedType: {} as PlaceStylesEnum,
        enumType: {} as PlaceStylesEnum,
        enumArrayType: [] as PlaceStylesEnum[],
        enumValues: PlaceStylesEnumValues,
        dbType: 'place_styles_enum',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      currentLocalizedText: {
        type: 'HasOne',
        foreignKey: 'localizableId',
        tables: ['localized_texts'],
        optional: null,
        requiredOnClauses: ['locale'],
      },
      hostPlaces: {
        type: 'HasMany',
        foreignKey: 'placeId',
        tables: ['host_places'],
        optional: null,
        requiredOnClauses: null,
      },
      hosts: {
        type: 'HasMany',
        foreignKey: null,
        tables: ['hosts'],
        optional: null,
        requiredOnClauses: null,
      },
      localizedTexts: {
        type: 'HasMany',
        foreignKey: 'localizableId',
        tables: ['localized_texts'],
        optional: null,
        requiredOnClauses: null,
      },
      rooms: {
        type: 'HasMany',
        foreignKey: 'placeId',
        tables: ['rooms'],
        optional: null,
        requiredOnClauses: null,
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
      default: ['dream:STI', 'dream:SoftDelete'],
      named: [],
    },
    columns: {
      appliances: {
        coercedType: {} as ApplianceTypesEnum[],
        enumType: {} as ApplianceTypesEnum,
        enumArrayType: [] as ApplianceTypesEnum[],
        enumValues: ApplianceTypesEnumValues,
        dbType: 'appliance_types_enum[]',
        allowNull: false,
        isArray: true,
      },
      bathOrShowerType: {
        coercedType: {} as BathOrShowerTypesEnum | null,
        enumType: {} as BathOrShowerTypesEnum,
        enumArrayType: [] as BathOrShowerTypesEnum[],
        enumValues: BathOrShowerTypesEnumValues,
        dbType: 'bath_or_shower_types_enum',
        allowNull: true,
        isArray: false,
      },
      bedTypes: {
        coercedType: {} as BedTypesEnum[],
        enumType: {} as BedTypesEnum,
        enumArrayType: [] as BedTypesEnum[],
        enumValues: BedTypesEnumValues,
        dbType: 'bed_types_enum[]',
        allowNull: false,
        isArray: true,
      },
      createdAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      deletedAt: {
        coercedType: {} as DateTime | null,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: true,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      placeId: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      position: {
        coercedType: {} as number | null,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'integer',
        allowNull: true,
        isArray: false,
      },
      type: {
        coercedType: {} as RoomTypesEnum,
        enumType: {} as RoomTypesEnum,
        enumArrayType: [] as RoomTypesEnum[],
        enumValues: RoomTypesEnumValues,
        dbType: 'room_types_enum',
        allowNull: false,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
    },
    virtualColumns: [],
    associations: {
      currentLocalizedText: {
        type: 'HasOne',
        foreignKey: 'localizableId',
        tables: ['localized_texts'],
        optional: null,
        requiredOnClauses: ['locale'],
      },
      localizedTexts: {
        type: 'HasMany',
        foreignKey: 'localizableId',
        tables: ['localized_texts'],
        optional: null,
        requiredOnClauses: null,
      },
      place: {
        type: 'BelongsTo',
        foreignKey: 'placeId',
        tables: ['places'],
        optional: false,
        requiredOnClauses: null,
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
        enumArrayType: null,
        enumValues: null,
        dbType: 'timestamp without time zone',
        allowNull: false,
        isArray: false,
      },
      email: {
        coercedType: {} as string,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'citext',
        allowNull: false,
        isArray: false,
      },
      firstName: {
        coercedType: {} as string | null,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'character varying',
        allowNull: true,
        isArray: false,
      },
      id: {
        coercedType: {} as IdType,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'bigint',
        allowNull: false,
        isArray: false,
      },
      lastName: {
        coercedType: {} as string | null,
        enumType: null,
        enumArrayType: null,
        enumValues: null,
        dbType: 'character varying',
        allowNull: true,
        isArray: false,
      },
      updatedAt: {
        coercedType: {} as DateTime,
        enumType: null,
        enumArrayType: null,
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
        requiredOnClauses: null,
      },
      host: {
        type: 'HasOne',
        foreignKey: 'userId',
        tables: ['hosts'],
        optional: null,
        requiredOnClauses: null,
      },
    },
  },
} as const

export const globalSchema = {
  passthroughColumns: [],
  allDefaultScopeNames: ['dream:STI', 'dream:SoftDelete'],
  globalNames: {
    models: {
      'Guest': 'guests',
      'Host': 'hosts',
      'HostPlace': 'host_places',
      'LocalizedText': 'localized_texts',
      'Place': 'places',
      'Room/Bathroom': 'rooms',
      'Room/Bedroom': 'rooms',
      'Room/Den': 'rooms',
      'Room/Kitchen': 'rooms',
      'Room/LivingRoom': 'rooms',
      'Room': 'rooms',
      'User': 'users'
    },
    serializers: [
      'GuestSerializer',
      'GuestSummarySerializer',
      'HostSerializer',
      'HostSummarySerializer',
      'LocalizedTextSerializer',
      'LocalizedTextSummarySerializer',
      'PlaceSerializer',
      'PlaceSummarySerializer',
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
      'RoomSerializer',
      'RoomSummarySerializer'
    ],
  },
} as const
