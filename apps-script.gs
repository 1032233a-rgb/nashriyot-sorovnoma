// Google Apps Script — so'rovnoma javoblarini Google Sheets'ga yozadi.
// O'rnatish tartibi README.md faylida.

const SHEET_NAME = 'Javoblar';

// Telegram sozlamalari — bot tokeni va xabar boradigan chat ID
const TG_TOKEN = 'PASTE_BOT_TOKEN_HERE';
const TG_CHAT_ID = 'PASTE_CHAT_ID_HERE';

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

    sendToTelegram(d);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Yangi javobni Telegram'ga xabar qilib yuboradi.
// Telegram xatosi asosiy oqimni buzmasligi uchun alohida try/catch ichida.
function sendToTelegram(d) {
  if (!TG_TOKEN || TG_TOKEN.indexOf('PASTE') === 0) return;
  try {
    const lines = [
      '📚 Yangi so\'rovnoma javobi',
      '',
      '👤 ' + (d.fio || '—') + (d.lavozim ? ' (' + d.lavozim + ')' : ''),
      '🏢 ' + (d.tashkilot || '—'),
      '📍 ' + (d.hudud || '—'),
      '📞 ' + (d.telefon || '—') + (d.email ? ' · ' + d.email : ''),
      '',
      '📖 Faoliyat: ' + (d.faoliyat || '—'),
      '⏳ Tajriba: ' + (d.tajriba || '—') + (d.xodimlar ? ' · Xodimlar: ' + d.xodimlar : ''),
      '⚠️ Muammolar: ' + (d.muammolar || '—'),
      '🤝 Munosabat: ' + (d.munosabat || '—'),
      '🎯 Kutilmalar: ' + (d.kutilmalar || '—'),
      '💰 Badal: ' + (d.badal || '—'),
      '🙋 Ishtirok: ' + (d.ishtirok || '—'),
    ];
    if (d.taklif) lines.push('💡 Taklif: ' + d.taklif);
    if (d.izoh) lines.push('📝 Izoh: ' + d.izoh);

    UrlFetchApp.fetch('https://api.telegram.org/bot' + TG_TOKEN + '/sendMessage', {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chat_id: TG_CHAT_ID, text: lines.join('\n') }),
      muteHttpExceptions: true,
    });
  } catch (err) {
    // Telegram ishlamasa ham javob jadvalga yozilgan bo'ladi
  }
}
