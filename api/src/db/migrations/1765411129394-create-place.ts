import { DreamMigrationHelpers } from '@rvoh/dream/db'
import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await DreamMigrationHelpers.createExtension(db, 'citext')

  await db.schema
    .createType('place_styles_enum')
    .asEnum([
      'cottage',
      'cabin',
      'lean_to',
      'treehouse',
      'tent',
      'cave',
      'dump'
    ])
    .execute()

  await db.schema
    .createTable('places')
    .addColumn('id', 'uuid', col =>
      col
        .primaryKey()
        .defaultTo(sql`uuidv7()`),
    )
    .addColumn('name', sql`citext`, col => col.notNull())
    .addColumn('style', sql`place_styles_enum`, col => col.notNull())
    .addColumn('sleeps', 'integer', col => col.notNull())
    .addColumn('deleted_at', 'timestamp')
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('places').execute()

  await db.schema.dropType('place_styles_enum').execute()
}