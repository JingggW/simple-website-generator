import { JWT } from "google-auth-library";
import fs from "fs";

// Load path from env
const KEY_PATH = process.env.GCP_KEY_PATH;

async function getAuthClient() {
  if (!KEY_PATH || !fs.existsSync(KEY_PATH)) {
    throw new Error("GCP_KEY_PATH is not set or file does not exist.");
  }
  const credentials = JSON.parse(fs.readFileSync(KEY_PATH, "utf-8"));
  return new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendToSheet(spreadsheetId: string, range: string, values: any[]) {
  const auth = await getAuthClient();
  const token = await auth.getAccessToken();

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [values],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Google Sheets API Error: ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}
