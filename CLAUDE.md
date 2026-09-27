# Loyiha konteksti (Claude uchun)

Bu fayl har bir sessiya boshida avtomatik o'qiladi. Uni loyihaning **hozirgi** holati bilan
bir xil saqlang: yangi imkoniyat qo'shilsa yoki o'zgarsa, shu commit'da bu faylni ham yangilang.

## Haqiqat manbai

- Kod (`index.html`, `apps-script.gs`) — asosiy manba. Hujjat kod bilan zid bo'lsa, kodga ishoning
  va hujjatni tuzating.
- `README.md` — foydalanuvchi uchun o'rnatish yo'riqnomasi.

## Hozirgi imkoniyatlar

- `index.html`: so'rovnoma formasi, `fetch(SCRIPT_URL, { mode: 'no-cors' })` bilan JSON yuboradi.
  `SCRIPT_URL` amaldagi Apps Script Web App URL bilan to'ldirilgan.
- `apps-script.gs`:
  - `doPost` javobni `Javoblar` varag'iga yozadi (`HEADERS` tartibida).
  - `sendToTelegram` har bir javobni Telegram'ga yuboradi. `TG_TOKEN`/`TG_CHAT_ID` repoda
    placeholder; haqiqiy qiymatlar faqat Apps Script muharririda turadi.

## Qoidalar

- Formaga yangi maydon qo'shilsa, uchta joy birga o'zgaradi: `index.html` dagi `data` obyekti,
  `apps-script.gs` dagi `HEADERS` va `appendRow`, kerak bo'lsa `sendToTelegram`.
- Haqiqiy Telegram tokenini commit qilmang.
- Apps Script kodi o'zgarsa, foydalanuvchiga qayta deploy (New version) kerakligini eslating.
