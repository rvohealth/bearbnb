import { DreamMigrationHelpers } from '@rvoh/dream/db'
import { Kysely } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  // To prevent more than one Room within a Place having the same
  // position, we add a unique constraint. Sortable requires that
  // this be a deferrable unique constraint since, during the
  // re-sorting transaction, the position may temporarily collide.
  await DreamMigrationHelpers.addDeferrableUniqueConstraint(db, 'room_position_contraint', {
    table: 'rooms',
    columns: ['place_id', 'position'],
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await DreamMigrationHelpers.dropConstraint(db, 'room_position_contraint', { table: 'rooms' })
}