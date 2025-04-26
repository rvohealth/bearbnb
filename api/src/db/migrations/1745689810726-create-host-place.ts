import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('host_places')
    .addColumn('id', 'bigserial', col => col.primaryKey())
    .addColumn('host_id', 'bigint', col => col.references('hosts.id').onDelete('restrict').notNull())
    .addColumn('place_id', 'bigint', col => col.references('places.id').onDelete('restrict').notNull())
    .addColumn('deleted_at', 'timestamp')
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('host_places').execute()
}