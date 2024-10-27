import { DreamMigrationHelpers } from '@rvohealth/dream'
import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await DreamMigrationHelpers.createExtension(db, 'citext')

  await db.schema
    .createType('place_styles_enum')
    .asEnum(['cabin', 'cave', 'cottage', 'dump', 'lean_to', 'tent', 'treehouse'])
    .execute()

  await db.schema
    .createTable('places')
    .addColumn('id', 'bigserial', col => col.primaryKey())
    .addColumn('name', sql`citext`, col => col.notNull())
    .addColumn('style', sql`place_styles_enum`, col => col.notNull())
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .addColumn('deleted_at', 'timestamp')
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('places').execute()

  await db.schema.dropType('place_styles_enum').execute()
}
