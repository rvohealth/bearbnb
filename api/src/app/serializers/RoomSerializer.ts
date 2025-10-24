import Room from '@models/Room.js'
import { DreamSerializer } from '@rvoh/dream'
import { LocalesEnum } from '@src/types/db.js'
import i18n from '@src/utils/i18n.js'

export const RoomSummarySerializer = <T extends Room>(StiChildClass: typeof Room, room: T) =>
  DreamSerializer(StiChildClass ?? Room, room)
    .attribute('type', { openapi: { type: 'string', enum: [(StiChildClass ?? Room).sanitizedName] } })
    .attribute('id')
    .attribute('position')

export const RoomSerializer = <T extends Room>(StiChildClass: typeof Room, room: T) =>
  RoomSummarySerializer(StiChildClass, room).attribute('deletedAt')

export const RoomForGuestsSerializer = <T extends Room>(
  StiChildClass: typeof Room,
  room: T,
  passthrough: { locale: LocalesEnum },
) =>
  DreamSerializer(StiChildClass ?? Room, room)
    .attribute('id')
    .attribute('type')
    .customAttribute('displayType', () => i18n(passthrough.locale, `rooms.type.${room.type}`), {
      openapi: 'string',
    })
    .delegatedAttribute<Room, 'currentLocalizedText'>('currentLocalizedText', 'title', { openapi: 'string' })
