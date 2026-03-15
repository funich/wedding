/* 
  HOUSEKEEPING INSTRUCTIONS:
  1. Create a new Google Sheet.
  2. In the menu, go to Extensions > Apps Script.
  3. Delete any code in the editor and paste the code below.
  4. Click "Deploy" > "New Deployment".
  5. Select type: "Web App".
  6. Description: "Wedding RSVP Backend".
  7. Execute as: "Me" (Your email).
  8. Who has access: "Anyone".
  9. Click Deploy, authorize permissions, and copy the "Web App URL".
  10. Paste the URL into `main.js` in the `SCRIPT_URL` variable.
*/

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Дата', 'Имя', 'Фамилия', 'Присутствие', 'Комментарий']);
    }
    
    // Append the new response
    sheet.appendRow([
      new Date(),
      data.name,
      data.surname,
      data.presence,
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
