import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('guests')
    .addColumn('id', 'uuid', col =>
      col
        .primaryKey()
        .defaultTo(sql`uuidv7()`),
    )
    .addColumn('user_id', 'uuid', col => col.references('users.id').onDelete('restrict').notNull())
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .execute()

  await db.schema
    .createIndex('guests_user_id')
    .on('guests')
    .column('user_id')
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex('guests_user_id').execute()
  await db.schema.dropTable('guests').execute()
}