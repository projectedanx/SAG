import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";

const server = new McpServer({
  name: "korsakov-matrix-server",
  version: "2026.4.12",
});

/** Path to the local-first persistent storage artifact representing the Epistemic Matrix */
const MATRIX_FILE_PATH = path.resolve(process.cwd(), "../matrix.json");

/**
 * Registers the 'read_epistemic_matrix' tool following the KORSAKOV architectural manifest.
 * PURPOSE: Extracts the ephemeral state of the Sovereign App Matrix into a persistent, queryable Local-first JSON layer.
 * Enforces JSON Schema Draft 2020-12 and strict path traversal shear protection by only allowing reads from matrix.json.
 */
server.registerTool(
  "read_epistemic_matrix",
  {
    title: "Read Epistemic Matrix",
    description: [
      "PURPOSE: Extracts the current ephemeral state of the Sovereign App Matrix into a persistent, queryable Local-first JSON layer.",
      "GUIDELINES: Invoke to retrieve the current state of the Epistemic Matrix.",
      "LIMITATIONS: Only accesses the predefined matrix.json artifact to prevent path traversal shear.",
      "PARAMETERS: None required."
    ].join(" "),
    inputSchema: z.object({
        _internal: z.boolean().default(true).describe("Empty parameter to satisfy schema requirements")
    }),
  },
  async () => {
    try {
      const data = await fs.readFile(MATRIX_FILE_PATH, "utf-8");
      return {
        content: [{ type: "text", text: data }],
      };
    } catch (error: any) {
      if (error.code === 'ENOENT') {
         return {
            content: [{ type: "text", text: "[]" }]
         };
      }
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error_code: "TOOL_FAULT_GENERAL_PROGRAMMING",
            fault_category: "GENERAL_PROGRAMMING",
            structured_detail: {
              violation: "FILE_READ_ERROR",
              error: error.message,
            },
            retry_viable: true,
            suggested_decomposition: "Ensure matrix.json is readable.",
          }),
        }],
        isError: true,
      };
    }
  }
);

/**
 * Registers the 'write_epistemic_matrix' tool following the KORSAKOV architectural manifest.
 * PURPOSE: Mutates the persistent Local-first JSON layer with a new Epistemic Matrix state.
 * Implements SERF-compliant structured error recoveries for mutation failures and JSON validation faults.
 */
server.registerTool(
  "write_epistemic_matrix",
  {
    title: "Write Epistemic Matrix",
    description: [
      "PURPOSE: Mutates the persistent Local-first JSON layer with a new Epistemic Matrix state.",
      "GUIDELINES: Invoke to save the new state of the Epistemic Matrix.",
      "LIMITATIONS: Only accesses the predefined matrix.json artifact. Max length 10MB.",
      "PARAMETERS: matrix_data — The serialized JSON array of AppItem objects representing the Epistemic Matrix."
    ].join(" "),
    inputSchema: z.object({
      matrix_data: z
        .string()
        .max(10485760, "Maximum length 10MB")
        .describe("The serialized JSON array of AppItem objects representing the Epistemic Matrix."),
    }),
  },
  async ({ matrix_data }) => {
    try {
      // Validate JSON structure before writing
      JSON.parse(matrix_data);

      await fs.writeFile(MATRIX_FILE_PATH, matrix_data, "utf-8");
      return {
        content: [{ type: "text", text: JSON.stringify({ status: "EXECUTED" }) }],
      };
    } catch (error: any) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error_code: "TOOL_FAULT_SERVER_TOOL_CONFIGURATION",
            fault_category: "SERVER_TOOL_CONFIGURATION",
            structured_detail: {
              violation: "MUTATION_ATTEMPT_FAILED",
              error: error.message,
            },
            retry_viable: false,
            suggested_decomposition: "Validate JSON payload before submission.",
          }),
        }],
        isError: true,
      };
    }
  }
);

/**
 * Initializes the StdioServerTransport and connects the MCP server, logging the active state.
 * Executes the core KORSAKOV-compliant server loop for stdio-based inter-process communication.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("KORSAKOV: stdio transport active. MCP 2026.4.12.\n");
}

main().catch((err) => {
  process.stderr.write(`KORSAKOV: Fatal — ${err.message}\n`);
  process.exit(1);
});
