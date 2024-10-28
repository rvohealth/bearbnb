import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('room_types_enum')
    .asEnum(['Bathroom', 'Bedroom', 'Den', 'Garage', 'Kitchen', 'LivingRoom'])
    .execute()

  await db.schema
    .createTable('rooms')
    .addColumn('id', 'bigserial', col => col.primaryKey())
    .addColumn('type', sql`room_types_enum`, col => col.notNull())
    .addColumn('place_id', 'bigint', col => col.references('places.id').onDelete('restrict').notNull())
    .addColumn('position', 'integer')
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .addColumn('deleted_at', 'timestamp')
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('rooms').execute()

  await db.schema.dropType('room_types_enum').execute()
}
