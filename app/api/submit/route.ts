import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const referer = req.headers.get("referer");
    let clientId = "";

    // 1. Resolve client ID for multi-tenant previews from the Referer URL path
    if (referer) {
      try {
        const url = new URL(referer);
        const pathSegments = url.pathname.split("/").filter(Boolean);
        if (pathSegments.length > 0) {
          const firstSegment = pathSegments[0];
          const standardRoutes = ["about", "contact", "services"];
          if (!standardRoutes.includes(firstSegment)) {
            clientId = firstSegment;
          }
        }
      } catch {}
    }

    if (!clientId) {
      clientId = req.headers.get("X-Rymee-Client-ID") || "rymee-studio";
    }

    // Sanitize client ID to prevent path traversal
    const sanitizedClientId = clientId.toLowerCase().replace(/[^a-z0-9-_]/g, "");

    // 2. Load the site configuration to inspect integration settings
    let siteConfig: any = null;
    const generatedPath = path.resolve(process.cwd(), "generated", sanitizedClientId, "site_full.json");
    const localProjectPath = path.resolve(process.cwd(), "../propsite-projects", sanitizedClientId, "site.json");
    const activePath = path.resolve(process.cwd(), "config", "site.json");

    if (fs.existsSync(generatedPath)) {
      try {
        siteConfig = JSON.parse(fs.readFileSync(generatedPath, "utf-8"));
      } catch {}
    } else if (process.env.NODE_ENV === "development" && fs.existsSync(localProjectPath)) {
      try {
        siteConfig = JSON.parse(fs.readFileSync(localProjectPath, "utf-8"));
      } catch {}
    } else if (fs.existsSync(activePath)) {
      try {
        siteConfig = JSON.parse(fs.readFileSync(activePath, "utf-8"));
      } catch {}
    }

    // 3. Extract integration settings
    const web3FormsAccessKey = siteConfig?.web3FormsAccessKey;
    
    // Read local crm.json fallback for sheet credentials if crmSheetId isn't inside site.json
    let crmSheetId = siteConfig?.crmSheetId;
    if (!crmSheetId) {
      const configPath = path.join(process.cwd(), "config", "crm.json");
      if (fs.existsSync(configPath)) {
        try {
          const crmConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
          crmSheetId = crmConfig.crmSheetId;
        } catch {}
      }
    }
    crmSheetId = crmSheetId || "1QwttvjeKA3FeHpzGSXkQACeaYvjb4G7T1ZRfAcL6AS8"; // Ultimate fallback

    // Standardize data from frontend forms
    const standardizedPayload = {
      name: body.client_name || body.name,
      email: body.client_email || body.email,
      message: body.message || body.notes || "",
      source: body.ps_source || "Web",
      ...body, // keep everything else just in case
    };

    // 4. Submit to Web3Forms if an access key is present
    if (web3FormsAccessKey) {
      console.log(`✉️ Routing submission for client '${sanitizedClientId}' to Web3Forms...`);
      
      const payload = {
        access_key: web3FormsAccessKey,
        name: standardizedPayload.name,
        email: standardizedPayload.email,
        message: standardizedPayload.message,
        subject: `New Lead from ${siteConfig?.header?.title || sanitizedClientId} Website`,
        from_name: siteConfig?.header?.title || sanitizedClientId,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Web3Forms returned status: ${response.status} - ${errorText}`);
      }

      return NextResponse.json({ success: true });
    }

    // 5. Otherwise, fall back to the standard Google Sheets CRM proxy
    console.log(`🔒 Proxying request for client '${sanitizedClientId}' to Google Sheets backend...`);
    const backendUrl = process.env.RYMEE_BACKEND_URL || "http://localhost:8080";

    const response = await fetch(`${backendUrl}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Rymee-Sheet-ID": crmSheetId,
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
