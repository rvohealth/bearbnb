import { Kysely } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('stays')
    .addColumn('id', 'bigserial', col => col.primaryKey())
    .addColumn('guest_id', 'bigint', col => col.references('guests.id').onDelete('restrict').notNull())
    .addColumn('place_id', 'bigint', col => col.references('places.id').onDelete('restrict').notNull())
    .addColumn('checkin_on', 'date', col => col.notNull())
    .addColumn('checkout_on', 'date', col => col.notNull())
    .addColumn('adults', 'integer', col => col.notNull().defaultTo(1))
    .addColumn('cubs', 'integer', col => col.notNull().defaultTo(0))
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('stays').execute()
}
