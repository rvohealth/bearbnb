/**
 * MCP-HTTP Bridge (TypeScript): Connects MCP stdio protocol to your HTTP RAG API.
 *
 * Usage: npx ts-node mcp_http_bridge.ts (or via a yarn script)
 *
 * Requirements:
 *   - Node.js 18+
 *   - axios (yarn add axios)
 *   - @types/node (for type safety)
 *
 * This script implements a fallback JSON-RPC-like MCP bridge over stdio.
 */

import axios from 'axios'
import * as readline from 'readline'

const RAG_API_ENDPOINT = process.env.RAG_API_ENDPOINT || 'http://localhost:8000/query'
const RAG_API_TIMEOUT = 10000

interface JsonRpcRequest {
  jsonrpc?: string
  method: string
  params?: {
    name?: string
    arguments?: {
      query?: string
      top_k?: number
    }
  }
  id?: string | number | null
}

interface JsonRpcError {
  code: number
  message: string
}

interface JsonRpcResponse {
  jsonrpc: string
  id?: string | number | null
  result?: unknown
  error?: JsonRpcError
}

function writeResponse(response: JsonRpcResponse) {
  process.stdout.write(JSON.stringify(response) + '\n')
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
})

rl.on('line', (line: string) => {
  void (async () => {
    let request: JsonRpcRequest
    try {
      request = JSON.parse(line) as JsonRpcRequest
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
          const response = await axios.post<unknown>(
            RAG_API_ENDPOINT,
            { query, top_k },
            { timeout: RAG_API_TIMEOUT }
          )
          const ragResults = response.data
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
          writeResponse({
            jsonrpc: '2.0',
            id,
            error: { code: -32000, message: `Error querying RAG API: ${error.message}` },
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
