import { Kysely } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('guests')
    .addColumn('id', 'bigserial', col => col.primaryKey())
    .addColumn('user_id', 'bigint', col => col.references('users.id').onDelete('restrict').notNull().unique())
    .addColumn('created_at', 'timestamp', col => col.notNull())
    .addColumn('updated_at', 'timestamp', col => col.notNull())
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('guests').execute()
}
