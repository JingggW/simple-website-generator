/**
 * PROPSITE ENGINE: SPREADSHEET CRM SCRIPT (v5 - Full Automation)
 * 
 * @OnlyCurrentDoc
 * 
 * @include CalendarApp
 * 
 * Instructions:
 * 1. REPLACE everything in Code.gs with this code.
 * 2. Set your SECRET_KEY below.
 * 3. Click 'Save' then 'Deploy' > 'New Deployment'. (Choose New Version)
 */

var SECRET_KEY = "ps_secret_12345"; 
var executionLogs = []; 

function log(msg) {
  executionLogs.push(new Date().toLocaleTimeString() + ": " + msg);
  Logger.log(msg);
}

function testEmail() {
  var email = Session.getActiveUser().getEmail();
  GmailApp.sendEmail(email, "PropSite CRM Test", "Permissions are WORKING!");
  Logger.log("Test email sent to: " + email);
}

/**
 * MANUAL CALENDAR TEST
 * Run this to check if the script has permission to create events.
 */
function testCalendar() {
  var now = new Date();
  var tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
  tomorrow.setHours(10, 0, 0, 0);
  
  var event = CalendarApp.getDefaultCalendar().createEvent(
    "PropSite Calendar Test",
    tomorrow,
    new Date(tomorrow.getTime() + (60 * 60 * 1000)),
    { description: "If you see this, Calendar sync is WORKING!" }
  );
  
  Logger.log("Test event created: " + event.getTitle() + " at " + tomorrow);
}

/**
 * SIMULATE A REQUEST
 * Use this to test the full logic (sheet + email + calendar)
 */
function testDoPost() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        ps_secret: "ps_secret_12345",
        client_name: "Test User",
        client_email: Session.getActiveUser().getEmail(),
        proposed_datetime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        requested_service: "Consultation",
        notes: "This is a simulated test."
      })
    }
  };
  doPost(mockEvent);
}

function doPost(e) {
  executionLogs = []; 
  try {
    if (!e || !e.postData) {
      log("ERROR: No postData found.");
      return createJsonResponse("error", "No data received");
    }
    var data = JSON.parse(e.postData.contents);
    log("Incoming Payload: " + JSON.stringify(data));

    // 1. Security Check
    if (data.ps_secret !== SECRET_KEY) {
      log("SECURITY ERROR: Secret key mismatch.");
      return createJsonResponse("unauthorized");
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 2. Setup Headers if new
    if (sheet.getLastRow() === 0) {
      var headers = ["Timestamp", "Status", "Source Page", "Form Type"];
      for (var key in data) { 
        if (key !== "ps_secret") headers.push(key); 
      }
      sheet.appendRow(headers);
    }
    
    // 3. Prepare Base Data Row
    var row = [new Date(), "NEW", data.ps_source || "Unknown", data.ps_type || "General"];
    var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    for (var i = 4; i < headerRow.length; i++) {
      row.push(data[headerRow[i]] || "");
    }
    sheet.appendRow(row);
    log("Row added to spreadsheet.");

    // 4. AGGRESSIVE LOOKUP (Email and Name)
    var targetEmail = null;
    var targetName = "Valued Customer";
    for (var key in data) {
      var val = String(data[key]);
      if (key.toLowerCase().indexOf("email") !== -1 || val.indexOf("@") !== -1) targetEmail = val;
      if (key.toLowerCase().indexOf("name") !== -1) targetName = val;
    }

    // 5. CALENDAR SYNC (If date is present)
    var dateVal = data.proposed_datetime || data.date || data.Time;
    if (dateVal) {
      try {
        var startTime = new Date(dateVal);
        var endTime = new Date(startTime.getTime() + (60 * 60 * 1000)); // +1 hour
        
        var calendar = CalendarApp.getDefaultCalendar();
        calendar.createEvent(
          "[PENDING] " + (data.requested_service || "Appointment") + ": " + targetName,
          startTime,
          endTime,
          {
            description: "Email: " + targetEmail + "\nNotes: " + (data.notes || "None"),
            location: "To Be Confirmed",
            guests: targetEmail, // Adds customer as a guest
            sendInvites: true    // Automatically sends the invite email
          }
        );
        log("Calendar event created & invite sent to " + targetEmail);
      } catch (calErr) {
        log("Calendar failed: " + calErr.toString());
      }
    }

    // 6. EMAIL AUTOMATION
    if (targetEmail && targetEmail.indexOf("@") !== -1) {
      log("Attempting to send emails to: " + targetEmail);
      var bizName = SpreadsheetApp.getActiveSpreadsheet().getName() || "Our Business";
      
      // Send to Customer
      GmailApp.sendEmail(targetEmail, "Confirmation from " + bizName, 
        "Hi " + targetName + ",\n\nWe've received your request! Our team will be in touch shortly.\n\nBest,\n" + bizName);
      
      // Send to Owner
      var ownerEmail = Session.getActiveUser().getEmail();
      GmailApp.sendEmail(ownerEmail, "🔥 NEW LEAD: " + targetName, 
        "You have a new lead!\nEmail: " + targetEmail + "\nData: " + JSON.stringify(data));
      
      log("Email success.");
    }
    
    return createJsonResponse("success");
      
  } catch (error) {
    log("CRITICAL ERROR: " + error.toString());
    return createJsonResponse("error", error.toString());
  }
}

function createJsonResponse(result, error) {
  var out = { "result": result, "debug": executionLogs };
  if (error) out.error = error;
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
