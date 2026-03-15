/* 
  HOUSEKEEPING INSTRUCTIONS:
  1. Go back to your Google Apps Script editor.
  2. Replace ALL the previous code with this new version.
  3. Click "Deploy" > "Manage Deployments".
  4. Click the "Edit" (pencil icon) on your active deployment.
  5. Select "New Version".
  6. Click "Deploy" twice to finalize.
*/

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Support both JSON and Form submissions
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        // If JSON parsing fails, maybe it's parameters
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Дата', 'Имя', 'Фамилия', 'Присутствие', 'Комментарий']);
    }
    
    // Append the new response
    sheet.appendRow([
      new Date(),
      data.name || 'N/A',
      data.surname || 'N/A',
      data.presence || 'N/A',
      data.message || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
