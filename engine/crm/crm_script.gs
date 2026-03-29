/**
 * PROPSITE ENGINE: SPREADSHEET CRM SCRIPT (v2 - Secure)
 * 
 * @OnlyCurrentDoc
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. REPLACE everything with this code.
 * 4. IMPORTANT: Set your SECRET_KEY below to match your site.json.
 * 5. Click 'Save' then 'Deploy' > 'New Deployment'.
 * 6. Copy the Web App URL into your site.json as 'crmUrl'.
 */

var SECRET_KEY = "ps_secret_12345"; // CHANGE THIS to match site.json

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // 1. Security Check
    if (data.ps_secret !== SECRET_KEY) {
      return ContentService.createTextOutput(JSON.stringify({"result":"unauthorized"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 2. Setup Headers if new
    if (sheet.getLastRow() === 0) {
      var headers = ["Timestamp", "Status", "Source Page", "Form Type"];
      for (var key in data) { 
        if (key !== "ps_secret") headers.push(key); 
      }
      sheet.appendRow(headers);
      
      // Basic styling for headers
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
    }
    
    // 3. Prepare Data Row
    var row = [
      new Date(), 
      "NEW", // Default Status for Etsy-style workflow
      data.ps_source || "Unknown", 
      data.ps_type || "General"
    ];
    
    var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Map dynamic fields
    for (var i = 4; i < headerRow.length; i++) {
      row.push(data[headerRow[i]] || "");
    }
    
    sheet.appendRow(row);
    
    // 4. Success Response
    return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
