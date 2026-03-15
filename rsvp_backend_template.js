/* 
  NEW VERSION - HIDDEN IFRAME COMPATIBLE
  ======================================
  1. Replace ALL code in Apps Script with this.
  2. Deploy > New Deployment > Web App > Anyone.
  3. Ensure you have columns: Date, Name, Surname, Presence, Message.
*/

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = [
    new Date(),
    e.parameter.name || "N/A",
    e.parameter.surname || "N/A",
    e.parameter.presence || "N/A",
    e.parameter.message || ""
  ];
  sheet.appendRow(row);
  
  // Return a success message that can be read or just ignore
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
