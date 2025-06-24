import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createType('localized_types_enum').asEnum(['Host', 'Place', 'Room']).execute()

  await db.schema.createType('locales_enum').asEnum(['en-US', 'es-ES']).execute()

  await db.schema
    .createTable('localized_texts')
    .addColumn('id', 'bigserial', col => col.primaryKey())
    .addColumn('localizable_type', sql`localized_types_enum`, col => col.notNull())
    .addColumn('localizable_id', 'bigint', col => col.notNull())
    .addColumn('locale', sql`locales_enum`, col => col.notNull())
    .addColumn('title', 'varchar(255)')
    .addColumn('markdown', 'text')
    .addColumn('deleted_at', 'timestamp')
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .execute()

  await db.schema
    .createIndex('localized_texts_localizable_for_locale')
    .on('localized_texts')
    .columns(['localizable_type', 'localizable_id', 'locale'])
    .unique()
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('localized_texts').execute()

  await db.schema.dropType('localized_types_enum').execute()
  await db.schema.dropType('locales_enum').execute()
}
