# Connect the forms to Google Sheets

Both the Membership application and the Host inquiry post to one Google Apps
Script web app, which writes every submission to a Google Sheet and emails
you. One-time setup, about 10 minutes.

## 1. Make the sheet
1. Go to sheets.google.com, create a blank sheet, name it "Three Cities Form Submissions".
2. Share it with draymond@ and aabursey@ (or just keep it on the account that owns it).

## 2. Add the script
1. In the sheet: Extensions -> Apps Script.
2. Delete whatever is there, paste the code below.
3. Change the two emails in NOTIFY if you want different recipients.
4. Save (disk icon).

```
const NOTIFY = ['draymond@threecitiessocial.com', 'aabursey@threecitiessocial.com'];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Submissions')
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Submissions');
  const data = e.parameter;
  // Header row, written once.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Received', 'Form', 'First', 'Last', 'Email', 'Phone',
      'Membership', 'Home clubhouse', 'Neighborhood', 'Looking for', 'About',
      'Referral', 'Event type', 'Preferred date', 'Guest count', 'Details']);
  }
  sheet.appendRow([
    new Date(), data.form_name || '', data.first_name || '', data.last_name || '',
    data.email || '', data.phone || '', data.membership || '', data.home_location || '',
    data.neighborhood || '', data.looking_for || '', data.about || '', data.referral || '',
    data.event_type || '', data.preferred_date || '', data.guest_count || '', data.details || ''
  ]);
  // Email notification.
  const lines = Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n');
  MailApp.sendEmail(NOTIFY.join(','), 'New ' + (data.form_name || 'form') + ' submission', lines);
  return ContentService.createTextOutput('ok');
}
```

## 3. Deploy it
1. Top right: Deploy -> New deployment.
2. Gear icon -> Web app.
3. Description: "TCS forms". Execute as: Me. Who has access: **Anyone**.
4. Deploy. Authorize when prompted (it will warn it is unverified, that is fine, it is your own script).
5. Copy the Web app URL. It ends in /exec.

## 4. Send me the URL
Paste the /exec URL back in chat and I will drop it into both forms, rebuild
the deploy folder, and you push it once more. Done.
