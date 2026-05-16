import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const clientId = req.headers.get('X-Rymee-Client-ID');

    if (!clientId) {
      return NextResponse.json({ error: 'Missing Client ID' }, { status: 401 });
    }

    // 1. Load the active configuration to find the destination sheet
    const configPath = path.join(process.cwd(), 'config', 'crm.json');
    let crmSheetId = "";
    
    if (fs.existsSync(configPath)) {
        const crmConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        crmSheetId = crmConfig.crmSheetId || "1QwttvjeKA3FeHpzGSXkQACeaYvjb4G7T1ZRfAcL6AS8"; // Fallback to provided ID for testing
    } else {
        crmSheetId = "1QwttvjeKA3FeHpzGSXkQACeaYvjb4G7T1ZRfAcL6AS8"; // Fallback
    }

    const backendUrl = process.env.RYMEE_BACKEND_URL || "http://localhost:8080";

    console.log(`🔒 Proxying request for client '${clientId}' to backend...`);

    // Standardize data from frontend forms
    const standardizedPayload = {
        name: body.client_name || body.name,
        email: body.client_email || body.email,
        message: body.message || body.notes || "",
        source: body.ps_source || "Web",
        ...body // keep everything else just in case
    };

    const response = await fetch(`${backendUrl}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Rymee-Sheet-ID": crmSheetId, // Pass the destination explicitly
      },
      body: JSON.stringify(standardizedPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Backend returned status: ${response.status} - ${errorData}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Proxy Error:", error);
    return NextResponse.json({ error: "Failed to process request through proxy." }, { status: 500 });
  }
}
