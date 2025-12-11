import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('localized_types_enum')
    .asEnum([
      'Host',
      'Place',
      'Room'
    ])
    .execute()

  await db.schema
    .createType('locales_enum')
    .asEnum([
      'en-US',
      'es-ES'
    ])
    .execute()

  await db.schema
    .createTable('localized_texts')
    .addColumn('id', 'uuid', col =>
      col
        .primaryKey()
        .defaultTo(sql`uuidv7()`),
    )
    .addColumn('localizable_type', sql`localized_types_enum`, col => col.notNull())
    .addColumn('localizable_id', 'uuid', col => col.notNull())
    .addColumn('locale', sql`locales_enum`, col => col.notNull())
    .addColumn('title', 'varchar(255)', col => col.notNull())
    .addColumn('markdown', 'text', col => col.notNull())
    .addColumn('deleted_at', 'timestamp')
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('localized_texts').execute()

  await db.schema.dropType('localized_types_enum').execute()
  await db.schema.dropType('locales_enum').execute()
}