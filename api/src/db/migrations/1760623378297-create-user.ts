import { DreamMigrationHelpers } from '@rvoh/dream'
import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await DreamMigrationHelpers.createExtension(db, 'citext')

  await db.schema
    .createTable('users')
    .addColumn('id', 'bigserial', col => col.primaryKey())
    .addColumn('email', sql`citext`, col => col.notNull().unique())
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute()
}
