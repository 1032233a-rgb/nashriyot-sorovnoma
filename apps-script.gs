// Google Apps Script — so'rovnoma javoblarini Google Sheets'ga yozadi.
// O'rnatish tartibi README.md faylida.

const SHEET_NAME = 'Javoblar';

const HEADERS = [
  'Sana',
  'F.I.Sh.',
  'Tashkilot',
  'Lavozim',
  'Hudud',
  'Telefon',
  'Email',
  'Faoliyat yo\'nalishi',
  'Tajriba',
  'Xodimlar soni',
  'Muammolar',
  'Assotsiatsiyaga munosabat',
  'Kutilmalar',
  'A\'zolik badali',
  'Ishtirok shakli',
  'Birinchi qadam taklifi',
  'Qo\'shimcha izoh',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      d.sana || new Date(),
      d.fio || '',
      d.tashkilot || '',
      d.lavozim || '',
      d.hudud || '',
      d.telefon || '',
      d.email || '',
      d.faoliyat || '',
      d.tajriba || '',
      d.xodimlar || '',
      d.muammolar || '',
      d.munosabat || '',
      d.kutilmalar || '',
      d.badal || '',
      d.ishtirok || '',
      d.taklif || '',
      d.izoh || '',
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
