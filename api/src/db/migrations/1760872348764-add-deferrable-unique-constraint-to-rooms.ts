import { DreamMigrationHelpers } from '@rvoh/dream'
import { Kysely } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await DreamMigrationHelpers.addDeferrableUniqueConstraint(db, 'room_position_contraint', {
    table: 'rooms',
    columns: ['place_id', 'position'],
  })
}

export async function down(): Promise<void> {}
