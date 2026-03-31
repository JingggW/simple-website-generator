# PropSite CRM: Google Sheets Roadmap

For a lightweight B2C CRM (Cafes, Salons, Trades), the Google Sheet shouldn't just be a list—it should be a **Tool**. Here are 3 directions to evolve the "Spreadsheet CRM":

## 1. The "Sales Pipeline" View
Instead of just rows, use Google Sheets features to create a visual flow:
*   **Dropdown Statuses**: Use 'Data Validation' on the **Status** column with colors:
    *   `NEW` (Blue)
    *   `CONTACTED` (Yellow)
    *   `BOOKED` (Green)
    *   `LOST` (Red)
*   **Automatic Highlighting**: Set a rule: "If row is > 24 hours old and Status is NEW, highlight Red." (Prevents lost leads).

## 2. Automated Follow-ups (Script Level)
We can update the `Code.gs` (Apps Script) to perform actions immediately upon submission:
*   **Auto-Responder**: When a lead submits, the script sends an immediate email: *"Hi [Name], thanks for reaching out to [Business]! We've received your request."*
*   **Owner Alert**: Send a mobile notification or email to the business owner so they can call the lead within 5 minutes.

## 3. Marketing & Insights Tab
Create a second tab in the sheet called **"Insights"** that uses pivot tables to show:
*   **Lead Velocity**: How many leads per week?
*   **Conversion Rate**: (Number of 'BOOKED' / Total Leads).
*   **Top Sources**: Which page is generating the most business? (e.g. "The /menu page is our #1 lead generator").

## 4. The "Mailing List" Sync
*   **Mailing List Tab**: Every new email address is automatically copied to a clean "Mailing List" tab. 
*   **One-Click Export**: The owner can download this tab as a CSV to upload into Mailchimp or send a personalized "Season Special" email to everyone at once.

## Appendix: Handling the Google Security Warning
When you (or your client) first deploy the CRM script, Google will show a "This app isn't verified" warning because it's a private script using the Gmail/Calendar service.

### How to authorize:
1.  On the warning screen, click **"Advanced"** (bottom left).
2.  Click **"Go to [Your Script Name] (unsafe)"** at the bottom.
3.  Click **"Allow"** on the next screen.
*This is 100% safe because the client is giving themselves permission to use their own script on their own account.*

---
*Note: This is a low-code approach that keeps the business owner in a tool they already understand (Google Sheets) while providing the power of a custom CRM.*
