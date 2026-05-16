import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from "hono";
import { appendToSheet } from "./sheets";

const app = new Hono();

app.post("/api/submit", async (c) => {
  try {
    const body = await c.req.json();
    
    // The backend is dumb and stateless. It relies on the secure proxy 
    // to tell it exactly which sheet to write to.
    const spreadsheetId = c.req.header("X-Rymee-Sheet-ID");

    if (!spreadsheetId) {
      return c.json({ error: "Missing Target Sheet ID. Proxy configuration error." }, 400);
    }

    console.log(`📝 Writing lead to sheet: ${spreadsheetId}...`);

    // Format: Timestamp, Name, Email, Message, Source
    const row = [
      new Date().toISOString(),
      body.name || "N/A",
      body.email || "N/A",
      body.message || "N/A",
      body.source || "Web",
    ];

    await appendToSheet(spreadsheetId, "Leads!A:E", row);

    return c.json({ success: true });
  } catch (e: any) {
    console.error("Backend Error:", e);
    return c.json({ error: e.message }, 500);
  }
});

const port = 8080;
console.log(`🚀 Rymee Backend API is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
