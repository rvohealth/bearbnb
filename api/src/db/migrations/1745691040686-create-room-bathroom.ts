import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('bath_or_shower_types_enum')
    .asEnum(['bath', 'shower', 'bath_and_shower', 'none'])
    .execute()

  await db.schema
    .alterTable('rooms')
    .addColumn('bath_or_shower_type', sql`bath_or_shower_types_enum`)
    .execute()

  await db.schema
    .alterTable('rooms')
    .addCheckConstraint(
      'rooms_not_null_bath_or_shower_type',
      sql`type != 'Bathroom' OR bath_or_shower_type IS NOT NULL`,
    )
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('rooms').dropColumn('bath_or_shower_type').execute()

  await db.schema.dropType('bath_or_shower_types_enum').execute()
}
