import { Kysely, sql } from 'kysely'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('bath_or_shower_styles_enum')
    .asEnum([
      'bath',
      'shower',
      'bath_and_shower',
      'none'
    ])
    .execute()

  await db.schema
    .alterTable('rooms')
    .addColumn('bath_or_shower_style', sql`bath_or_shower_styles_enum`)
    .execute()

  await db.schema
    .alterTable('rooms')
    .addCheckConstraint(
      'rooms_not_null_bath_or_shower_style',
      sql`type != 'Bathroom' OR bath_or_shower_style IS NOT NULL`,
    )
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('rooms')
    .dropColumn('bath_or_shower_style')
    .execute()

  await db.schema.dropType('bath_or_shower_styles_enum').execute()
}