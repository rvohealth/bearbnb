// Include any rule customizations rules
// below the OFFICIAL PSYCHIC RULES
// the OFFICIAL PSYCHIC RULES will be
// replaced whenever `yarn psy sync:ai-rules`
// is run

//////////////////////////////////////////
// OFFICIAL PSYCHIC RULES DO NOT MODIFY //
//////////////////////////////////////////

# Dream ORM and Psychic Framework Rules

This project uses [Dream ORM](https://github.com/rvohealth/dream) and [Psychic web framework](https://github.com/rvohealth/psychic), which are open-source frameworks that provide:

## Dream ORM

- TypeScript-first ORM built on Kysely
- Active Record pattern with associations
- Migrations and schema management
- Serializers for API responses
- Factory pattern for testing

## Psychic Framework

- Web framework built on Express
- Integrates with Dream ORM
- Automatic OpenAPI spec generation
- WebSocket support
- Background job processing with BullMQ
- Generator commands for scaffolding (models, controllers, serializers, etc.)

## Project Structure

- `src/app/models/` - Dream models
- `src/app/controllers/` - Psychic controllers
- `src/app/serializers/` - Dream serializers
- `src/app/view-models/` - View models (for complex data combinations and transformations)
- `src/app/services/` - Other classes and functions (not models, serializers, controllers, or view models)
- `src/conf/` - Application configuration
- `src/db/migrations/` - Database migrations
- `spec/` - Test specifications

## File Organization Rules

- **Dream model files** must be placed in a file hierarchy rooted at `src/app/models`, and their corresponding spec files in a parallel hierarchy rooted at `spec/unit/models`
- **Dream serializer files** must be placed in a file hierarchy rooted at `src/app/serializers`
- **View model files** (models used only in rare situations when complex data combinations and transformations warrant the overhead of a dedicated view model and corresponding spec file) must be placed in a file hierarchy rooted at `src/app/view-models`, and their corresponding spec files in a parallel hierarchy rooted at `spec/unit/view-models`
- **Psychic controller files** must be placed in a file hierarchy rooted at `src/app/controllers`, and their corresponding spec files in a parallel hierarchy rooted at `spec/unit/controllers`
- **Other classes and functions** (not Dream models, Dream serializers, Psychic controllers, or view models) should be placed in a file hierarchy rooted at `src/app/services`, and their corresponding spec files in a parallel hierarchy rooted at `spec/unit/services`

## Common Patterns

- Models use Dream's Active Record pattern
- Controllers extend `ApplicationController`, `AuthedController`, or `UnauthedController`
- Serializers define API response structure
- Use `yarn psy` commands for CLI operations (db:migrate, g:model, g:controller, etc.)
- **Always check `yarn psy <command> --help` before using any generator or CLI command** to understand the correct syntax and available options
- Generator commands follow patterns like: `yarn psy g:model ModelName field:type`
- STI (Single Table Inheritance) is supported for models

## Naming Conventions

- **Generator commands**: Always use snake_case for column names in generator commands
  - Example: `yarn psy g:model Stay Guest:belongs_to Place:belongs_to arrive_on:date depart_on:date adults:integer cubs:integer deleted_at:datetime:optional`
- **TypeScript model properties**: Always use camelCase in TypeScript code
  - Example: `arriveOn`, `departOn`, `deletedAt` (not `arrive_on`, `depart_on`, `deleted_at`)
- The generator automatically converts snake_case column names to camelCase in the generated TypeScript model files

## Key Commands

- `yarn psy db:migrate` - Run migrations
- `yarn psy sync` - Sync types from the database, OpenAPI specs, controller request/response body shapes for controller specs, front end types (where relevant), and other sync actions (which may be enhanced by plugins)
- `yarn psy g:model` - Generate a model
- `yarn psy g:migration` - Generate a migration (used to make database changes when not generating a model or a resource)
- `yarn psy g:controller` - Generate a controller
- `yarn psy g:resource` - Generate a full resource (model, controller, serializer, routes)
- `yarn uspec` - Run unit specs
- `yarn fspec` - Run feature specs

## Running Specs

- **Run all unit specs**: `yarn uspec`
- **Run all feature specs in a headless browser**: `yarn fspec`
- **Run all feature specs in a visible browser**: `yarn fspec:visible`
- **Run a specific spec file**: Include a path to an individual file, e.g.:
  - `yarn uspec spec/unit/controllers/V1/Host/PlacesController.spec.ts`
- **Run only specific specs within a file**: Include `.only` on a `describe`, `context`, or `it` block to run only the specs in that block
  - Example: `it.only('returns the index of Places', async () => {`
- **Skip specific specs within a file**: Include `.skip` on a `describe`, `context`, or `it` block to skip the specs in that block
  - Example: `it.skip('returns the index of Places', async () => {`

## Generator Usage Rules

- **A generator must always be used** when creating:
  - New models (using the model generator, sti-child generator, or resource generator)
  - New controllers (using the resource generator or controller generator)
  - New migrations (using the model generator, resource generator, or migration generator)
- **Generator preference order**:
  - **Resource generator is preferred** over all other generators (except for the sti-child generator) when a model may be manipulated via HTTP requests to the web application
  - **STI-child generator** is used when generating STI child models that build on an existing STI base model
  - **Model generator (or sti-child generator)** is preferred over the migration generator when a new model is being generated
  - **Migration generator** is used to make database changes when not generating a model or a resource

## Generator Workflow

After a generator has run:

1. **If the generator created a migration file**, the first step is to update the migration file as needed (for example, to add `unique()` to any column)
2. **Run the migrations**: `yarn psy db:migrate`
3. **If sync or post-sync operations throw an error**, try running `yarn psy sync --ignore-errors`
4. **If the generator was a resource generator**:
   - Update the generated controller spec first
   - Then update the corresponding generated controller
   - **Note**: Controller specs will hang if there is no response within a controller (the code for each controller action in the generated controller starts out commented out)
5. **Commit generated code as its own commit** with a commit message in the following format:
   - First line: Indicate what was generated (e.g., "Generated Room resource")
   - Blank line
   - "```console"
   - Blank line
   - The exact generator command that was run
   - Blank line
   - "```"
   - Example commit message:
     Generated Room resource

     ```console
     yarn psy g:resource --sti-base-serializer --owning-model=Place v1/host/places/rooms Room type:enum:room_types:Bathroom,Bedroom,Kitchen,Den
     ```

## When to Run `yarn psy sync`

- **Run `yarn psy sync`** whenever:
  - An association is added or changed in a Dream model
  - The OpenAPI shape needs to be updated (e.g., when a serializer is changed, an OpenAPI decorator in a controller is changed, or a route is changed)
- **If in a controller spec, there are type errors related to what types an endpoint accepts or returns**, this means that the OpenAPI shape is out of sync and `yarn psy sync` needs to be run
- **No need to run `yarn psy sync` after a migration** because:
  - Running migrations (`yarn psy db:migrate`) automatically runs psy sync
  - Running `yarn psy db:reset` (which is sometimes necessary, especially when switching between branches that contain migrations but have not yet been merged into main) automatically runs psy sync

## Adding Properties to Existing Models

- **Always use the migration generator** (`yarn psy g:migration`) to create a migration for any database schema changes; although optimized for adding fields, the scaffolding can easily be modified to make other database changes as well, using either DreamMigrationHelpers or Kysely-native calls
- Prefer a DreamMigrationHelpers method over compound Kysely calls when DreamMigrationHelpers provides a relevant method
- After generating the migration, manually add the property declaration to the model file
- Example: To add a `timezone` field to User, run `yarn psy g:migration add_timezone_to_users` then add `public timezone: DreamColumn<User, 'timezone'>` to the User model

## Date and Time Handling

- **Never, under any circumstances, use JavaScript's `Date` object** - always use Dream's date types instead
- Import `DateTime` and `CalendarDate` from `@rvoh/dream`
- **When the goal is a date with no time component, use `CalendarDate`** - refer to its TSDocs for available methods
- Use `DateTime` for datetime values (timestamps with time)
- Use `CalendarDate` for date-only values (no time component)
- Always use the features provided directly by the `DateTime` and `CalendarDate` classes
- Do not use `new Date()` anywhere in the codebase, even for intermediate calculations
- Refer to the TSDocs for `CalendarDate` and `DateTime` to understand their APIs - do not assume method names
- Example: `import { CalendarDate, DateTime } from '@rvoh/dream'`
- Example: `CalendarDate.today({ zone: 'America/New_York' })` to get today's date in a specific timezone

## Using RAG/MCP for Dream/Psychic Documentation

- **Always use the RAG/MCP server if it is available** to get accurate information about Dream and Psychic framework patterns, APIs, and best practices
- Query the RAG system for framework-specific questions before making assumptions about APIs or patterns
- **If the RAG/MCP server is not available or not responding, clearly communicate this** to the user rather than proceeding with assumptions
- The RAG contains official Dream/Psychic documentation and should be the primary source for framework-specific information
- Do not assume method names, patterns, or APIs - query the RAG or check TSDocs when in doubt

## Behavior-Driven Development (BDD)

- **We practice BDD, not TDD**: This means we focus our expectations on outcomes, not implementation
- **For code being added independently of a generator**: Always add a failing spec first, then add the code to make the spec pass
  -- Follow the red-green-refactor cycle: write failing test → implement code → refactor
  -- **Generated code is the only exception** to this rule, because the generators automatically create scaffolding for the specs and implementation at the same time

### Spec Organization and Structure

- **When spec'ing a function**: Only use `describe` for the outermost block (`describe('theFunctionName', () => {`) and use `context` blocks for setting up different state for different cases (a context block is only necessary to isolate different state)
- **When spec'ing a class**: Only use `describe` for the outermost block (`describe('ClassName', () => {`) and for each public method in that class (`describe('.staticMethodName', () => {` or `describe('#instanceMethodName', () => {`)) and use `context` blocks for setting up different state for different cases (a context block is only necessary to isolate different state)

### Spec Best Practices

- **Keep DRY with spec setup**: Leverage nested `context` blocks to change only the one thing being tested by that context
  - Example: If the effect of different `options`, is being spec'ed, define `let options: OptionInterface` in the `describe` block and set them to the happy path values in a `beforeEach` within that `describe` block, and only change one property in `options` in a `beforeEach` in each of the nested context blocks
  - The string label of the context block should indicate what is changing in that context, e.g. `context('when the color is red', () => {`)
- **Don't spec the behavior of another class that has already been spec'd**: When spec'ing a new class that relies on that other class, use a vitest spy to return different values in different `context` blocks instead
- **Never stub Dream internals**: Don't spy on Dream methods like `loaded` and try to mock the behavior
- **In controller specs, generally use factories to create real models and let controllers leverage Dream querying features (never mocked) to fetch those models**: Controllers usually use real Dream queries, not mocked data
  - **If a service class/function that is itself spec'd is used to fetch the data, or a view-model that is itself spec'd is used to transform the fetched data**: You might mock that, but you might also simply create data to satisfy the happy path and ensure that the specs for the service class/function or view-model is where the full variety of test cases are covered
- **Use Polly for external API calls**: Use Polly (see `setupPolly`) to record and replay external API calls rather than stubbing those calls
- **When testing soft deletes, follow BDD principles by testing behavior**: Test that the item has been deleted (normal query) and that it's still present when scopes are removed (including the soft delete scope)
  - Example:
    ```
      const placeQuery = Place.where({ id: place.id })
      expect(await placeQuery.exists()).toBe(false)
      expect(await placeQuery.removeAllDefaultScopes().exists()).toBe(true)
    ```

## Code Comments

- **Only use comments to explain "why", not "what"** - the implementation already shows what the code does, and comments explaining what are non-DRY and easily fall out of date
- **Prefer expressive code over comments** - if you find yourself writing a comment to explain what a line does, consider if the code can be made more expressive through better naming or extraction instead
- **TSDoc comments explaining "how" or "when" to use a function, method, or class are welcome**

When working with this codebase, prioritize Dream and Psychic patterns and conventions. Refer to the official documentation at https://psychicframework.com/ when needed.

## Customizing These Rules

- **Any customizations to these rules must be added AFTER the following marker:**
  ```
  //////////////////////////////////////////////
  // end:OFFICIAL PSYCHIC RULES DO NOT MODIFY //
  //////////////////////////////////////////////
  ```
- **Do not modify any content above this marker** - it will be replaced when `yarn psy sync:ai-rules` is run
- **All project-specific customizations should be placed below the end marker**

//////////////////////////////////////////////
// end:OFFICIAL PSYCHIC RULES DO NOT MODIFY //
//////////////////////////////////////////////
