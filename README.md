# Welcome to your new Dream & Psychic app!

Check out [the docs](https://psychicframework.com/) or the [BearBnB demo app](https://github.com/rvohealth/bearbnb).

Perhaps [create some resources](https://psychicframework.com/docs/controllers/generating#resources)?

If you run into problems, ask questions on [Stack Overflow](https://stackoverflow.com/) using the `dream` or `psychic` tags.

### AI

Since Dream and Psychic are new, and not understood by the LLMs, there is a custom RAG (Retrieval-Augmented Generation) system for Dream and Psychic documentation. In Cursor: cmd-shift-p, select "View: Open MCP Settings", and add a "New MCP Server" named "dream-psychic-rag". Copy and paste the JSON from `./api/mcp.json.example`\* into the mcp.json file, editing the absolute path to the `mcp-http-bridge.js` file.

AI rules for developing a Dream and Psychic application are provided in `./api/AGENTS.md`\*. These rules may be customized by adding to the bottom of the file (a rule exists in the file to instruct AI to add new rules outside of the official Psychic rules).

To fetch the current version of the AI rules, use `pnpm psy sync:ai-rules`.

\* if this Psychic app was created without a front-end client, then these files are in the project root
