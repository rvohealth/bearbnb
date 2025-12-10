// Include any rule customizations rules
// below the OFFICIAL PSYCHIC RULES
// the OFFICIAL PSYCHIC RULES will be
// replaced whenever `{{PM}} psy sync:ai-rules`
// is run

//////////////////////////////////////////
// OFFICIAL PSYCHIC RULES DO NOT MODIFY //
//////////////////////////////////////////

# AGENTS.md

> **Note**: Throughout this document, `{{PM}}` is used as a placeholder for the package manager run command (e.g., `pnpm`, `yarn`, or `npm run`). See the "Package Manager Configuration" section at the end of this file for details.

## Dream ORM and Psychic Framework

This project uses [Dream ORM](https://github.com/rvohealth/dream) and [Psychic web framework](https://github.com/rvohealth/psychic).

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
- Use `{{PM}} psy` commands for CLI operations (db:migrate, g:model, g:controller, etc.)
- **CRITICAL: ALWAYS run `{{PM}} psy <command> --help` BEFORE running any generator command to verify the exact syntax and available options.**
- **Do NOT rely on memory or assumptions about generator syntax.** Common mistakes include:
  - Assuming flags like `:unique` exist (they don't - check `--help` to see actual options)
  - Wrong argument order (model name vs namespace vs fields)
  - Guessing at field type syntax
- **If a generator fails or produces unexpected output, the first step is to re-check `--help`.**
- Generator commands follow patterns like: `{{PM}} psy g:model ModelName field:type`
- STI (Single Table Inheritance) is supported for models

## Naming Conventions

- **Generator commands**: Always use snake_case for column names in generator commands
  - Example: `{{PM}} psy g:model Stay Guest:belongs_to Place:belongs_to arrive_on:date depart_on:date adults:integer cubs:integer deleted_at:datetime:optional`
- **TypeScript model properties**: Always use camelCase in TypeScript code
  - Example: `arriveOn`, `departOn`, `deletedAt` (not `arrive_on`, `depart_on`, `deleted_at`)
- The generator automatically converts snake_case column names to camelCase in the generated TypeScript model files

## Key Commands

- `{{PM}} psy db:migrate` - Run migrations
- `{{PM}} psy sync` - Sync types from the database, OpenAPI specs, controller request/response body shapes for controller specs, front end types (where relevant), and other sync actions (which may be enhanced by plugins)
- `{{PM}} psy g:model` - Generate a model
- `{{PM}} psy g:migration` - Generate a migration (used to make database changes when not generating a model or a resource)
- `{{PM}} psy g:controller` - Generate a controller
- `{{PM}} psy g:resource` - Generate a full resource (model, controller, serializer, routes)
- `{{PM}} uspec` - Run unit specs
- `{{PM}} fspec` - Run feature specs

## Running Specs

- **Run all unit specs**: `{{PM}} uspec`
- **Run all feature specs in a headless browser**: `{{PM}} fspec`
- **Run all feature specs in a visible browser**: `{{PM}} fspec:visible`
- **Run a specific spec file**: Include a path to an individual file, e.g.:
  - `{{PM}} uspec spec/unit/controllers/V1/Host/PlacesController.spec.ts`
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
2. **Run the migrations**: `{{PM}} psy db:migrate`
3. **If sync or post-sync operations throw an error**, try running `{{PM}} psy sync --ignore-errors`
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
     {{PM}} psy g:resource --sti-base-serializer --owning-model=Place v1/host/places/rooms Room type:enum:room_types:Bathroom,Bedroom,Kitchen,Den
     ```

## When to Run `{{PM}} psy sync`

- **Run `{{PM}} psy sync`** whenever:
  - An association is added or changed in a Dream model
  - The OpenAPI shape needs to be updated (e.g., when a serializer is changed, an OpenAPI decorator in a controller is changed, or a route is changed)
- **If in a controller spec, there are type errors related to what types an endpoint accepts or returns**, this means that the OpenAPI shape is out of sync and `{{PM}} psy sync` needs to be run
- **No need to run `{{PM}} psy sync` after a migration** because:
  - Running migrations (`{{PM}} psy db:migrate`) automatically runs psy sync
  - Running `{{PM}} psy db:reset` (which is sometimes necessary, especially when switching between branches that contain migrations but have not yet been merged into main) automatically runs psy sync

## Adding Properties to Existing Models

- **Always use the migration generator** (`{{PM}} psy g:migration`) to create a migration for any database schema changes; although optimized for adding fields, the scaffolding can easily be modified to make other database changes as well, using either DreamMigrationHelpers or Kysely-native calls
- Prefer a DreamMigrationHelpers method over compound Kysely calls when DreamMigrationHelpers provides a relevant method
- After generating the migration, manually add the property declaration to the model file
- Example: To add a `timezone` field to User, run `{{PM}} psy g:migration add_timezone_to_users` then add `public timezone: DreamColumn<User, 'timezone'>` to the User model

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

## Sources of Truth for Dream/Psychic Documentation

**CRITICAL: Never guess, assume, or invent method names, API patterns, or generator syntax.**

Dream and Psychic are vast frameworks with many patterns, APIs, and conventions that may not be obvious or may differ from assumptions. Always consult authoritative sources in the following order:

### Primary Sources of Truth (in order of priority)

1. **TSDocs** - For method signatures, parameters, return types, and usage examples of functions and classes
   - Check TSDocs in your IDE or in the source code before using any Dream/Psychic API
   - TSDocs are the definitive source for "what arguments does this method take" and "what does this method return"

2. **`{{PM}} psy --help` and `{{PM}} psy <command> --help`** - For generator command syntax and available options
   - **ALWAYS run `{{PM}} psy <command> --help`** before using any generator to verify exact syntax
   - Do not rely on memory or assumptions about what flags or arguments are available

3. **MCP Server** - For architectural patterns, best practices, and framework concepts
   - Query the MCP server for questions about "how should I structure this", "what pattern should I use", or "how does X work"
   - Use MCP to understand framework conventions and architectural decisions
   - The MCP server contains official Dream/Psychic documentation and examples

### Verification Workflow

**Never write code based on assumptions. Always verify first using the appropriate source.**

1. **Understand the task** - What needs to be implemented?
2. **Identify what you need to verify**:
   - Generator syntax? → Run `{{PM}} psy <command> --help`
   - Method/function signature? → Check TSDocs
   - Architectural pattern or framework concept? → Query MCP server
3. **Verify before implementing** - Use the appropriate source from the list above
4. **Review examples** - Look at existing code in the codebase that uses similar patterns
5. **Implement** - Write the code using verified information
6. **Test** - Run specs to validate the implementation

### When to Use Each Source

- **TSDocs**: "What parameters does `paramsFor` accept?", "What does `where()` return?", "How do I call this method?"
- **`{{PM}} psy --help`**: "What's the syntax for generating a migration?", "What flags does `g:resource` support?", "How do I specify a belongs_to relationship?"
- **MCP Server**: "How should I structure a controller?", "What's the pattern for handling authentication?", "When should I use a service vs a model method?"

### Fallback Strategy

- **If the MCP server is not available or not responding**, clearly communicate this to the user
- TSDocs and `{{PM}} psy --help` are always available and should be used as the foundation
- When uncertain about framework patterns and MCP is unavailable, look for similar examples in the existing codebase, but acknowledge the limitation

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

When working with this codebase, prioritize Dream and Psychic patterns and conventions. Refer to the official documentation at https://psychicframework.com when needed.

## Customizing These Rules

- **Any customizations to these rules must be added AFTER the following marker:**
  ```
  //////////////////////////////////////////////
  // end:OFFICIAL PSYCHIC RULES DO NOT MODIFY //
  //////////////////////////////////////////////
  ```
- **Do not modify any content above this marker** - it will be replaced when `{{PM}} psy sync:ai-rules` is run
- **All project-specific customizations should be placed below the end marker**

//////////////////////////////////////////////
// end:OFFICIAL PSYCHIC RULES DO NOT MODIFY //
//////////////////////////////////////////////


## Package Manager Configuration

**Package Manager Run Command**: `pnpm`
