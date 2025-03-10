import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('appliance_types_enum')
    .asEnum(['dishwasher', 'microwave', 'oven', 'stove'])
    .execute()

  await db.schema
    .alterTable('rooms')
    .addColumn('appliances', sql`appliance_types_enum[]`, col => col.defaultTo('{}').notNull())
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('rooms').dropColumn('appliances').execute()

  await db.schema.dropType('appliance_types_enum').execute()
}
