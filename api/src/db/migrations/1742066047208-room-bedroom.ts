import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('bed_types_enum')
    .asEnum(['bunk', 'cot', 'king', 'queen', 'sofabed', 'twin'])
    .execute()

  await db.schema
    .alterTable('rooms')
    .addColumn('bed_types', sql`bed_types_enum[]`, col => col.defaultTo('{}').notNull())
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('rooms').dropColumn('bed_types').execute()

  await db.schema.dropType('bed_types_enum').execute()
}
