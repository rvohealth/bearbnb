import { Kysely } from 'kysely'
import { DreamMigrationHelpers } from '@rvoh/dream/db'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await DreamMigrationHelpers.createExtension(db, 'uuid-ossp')
}

export async function down(): Promise<void> {
  // intentional no-op
}