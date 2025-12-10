/**
 * MCP-HTTP Bridge (JavaScript): Connects MCP stdio protocol to your HTTP RAG API.
 *
 * Usage: node mcp-http-bridge.js
 *
 * Requirements:
 *   - Node.js 18+
 *
 * This script implements a fallback JSON-RPC-like MCP bridge over stdio.
 */

import * as readline from 'node:readline'

const RAG_API_ENDPOINT = process.env.RAG_API_ENDPOINT || 'http://localhost:8000/query'
const RAG_API_TIMEOUT = 10000

function writeResponse(response) {
  process.stdout.write(JSON.stringify(response) + '\n')
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

rl.on('line', line => {
  void (async () => {
    let request
    try {
      request = JSON.parse(line)
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e))
      writeResponse({
        jsonrpc: '2.0',
        id: null,
        error: { code: -32700, message: `Parse error: ${error.message}` },
      })
      return
    }
    const { method, params = {}, id } = request
    if (method === 'initialize') {
      writeResponse({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { resources: {}, tools: {} },
          serverInfo: { name: 'dream-psychic-rag', version: '1.0.0' },
        },
      })
    } else if (method === 'tools/list') {
      writeResponse({
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'rag_query',
              description: 'Query the Dream/Psychic RAG system',
              inputSchema: {
                type: 'object',
                properties: {
                  query: { type: 'string' },
                  top_k: { type: 'integer', default: 5 },
                },
                required: ['query'],
              },
            },
          ],
        },
      })
    } else if (method === 'resources/list') {
      writeResponse({
        jsonrpc: '2.0',
        id,
        result: {
          resources: [],
        },
      })
    } else if (method === 'tools/call') {
      const toolName = params.name
      const arguments_ = params.arguments || {}
      if (toolName === 'rag_query') {
        const query = arguments_.query
        const top_k = arguments_.top_k || 5
        try {
          const abortController = new AbortController()
          const timeoutId = setTimeout(() => abortController.abort(), RAG_API_TIMEOUT)

          const response = await fetch(RAG_API_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, top_k }),
            signal: abortController.signal,
          })

          clearTimeout(timeoutId)

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const ragResults = await response.json()
          writeResponse({
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(ragResults, null, 2),
                },
              ],
            },
          })
        } catch (e) {
          const error = e instanceof Error ? e : new Error(String(e))
          const errorMessage =
            error.name === 'AbortError'
              ? `Request timeout after ${RAG_API_TIMEOUT}ms`
              : `Error querying RAG API: ${error.message}`
          writeResponse({
            jsonrpc: '2.0',
            id,
            error: { code: -32000, message: errorMessage },
          })
        }
      } else {
        writeResponse({
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Unknown tool: ${toolName}` },
        })
      }
    } else if (method === 'notifications/initialized') {
      // Acknowledge initialization notification
      return
    } else {
      writeResponse({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method not found: ${method}` },
      })
    }
  })()
})
