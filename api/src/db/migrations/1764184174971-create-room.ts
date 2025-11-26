import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('room_types_enum')
    .asEnum([
      'Bathroom',
      'Bedroom',
      'Kitchen',
      'Den',
      'LivingRoom'
    ])
    .execute()

  await db.schema
    .createTable('rooms')
    .addColumn('id', 'uuid', col =>
      col
        .primaryKey()
        .defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('type', sql`room_types_enum`, col => col.notNull())
    .addColumn('place_id', 'uuid', col => col.references('places.id').onDelete('restrict').notNull())
    .addColumn('position', 'integer')
    .addColumn('deleted_at', 'timestamp')
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .execute()

  await db.schema
    .createIndex('rooms_type')
    .on('rooms')
    .column('type')
    .execute()

  await db.schema
    .createIndex('rooms_place_id')
    .on('rooms')
    .column('place_id')
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex('rooms_type').execute()
  await db.schema.dropIndex('rooms_place_id').execute()
  await db.schema.dropTable('rooms').execute()

  await db.schema.dropType('room_types_enum').execute()
}