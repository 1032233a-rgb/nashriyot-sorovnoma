# Nashriyot va kitob sohasi — so'rovnoma

Soha vakillarini assotsiatsiya ostida birlashtirishdan avval o'tkaziladigan onlayn so'rovnoma.
Javoblar Google Sheets'da jamlanadi va har bir yangi javob Telegram'ga xabar qilib yuboriladi.

## Fayllar

- `index.html` - so'rovnoma sahifasi (foydalanuvchilar to'ldiradi).
- `apps-script.gs` - javoblarni Google Sheets'ga yozadigan va Telegram'ga xabar yuboradigan server kodi.

## O'rnatish tartibi

### 1. Google Sheets tayyorlash

1. [sheets.google.com](https://sheets.google.com) da yangi jadval yarating, masalan "Assotsiatsiya so'rovnomasi".
2. Menyudan **Extensions → Apps Script** ni oching.
3. Ochilgan muharrirdagi kodni o'chirib, `apps-script.gs` faylidagi kodni to'liq joylashtiring.
4. Saqlang (Ctrl/Cmd+S).

### 2. Web App sifatida e'lon qilish

1. Apps Script muharririda **Deploy → New deployment** ni bosing.
2. Turini **Web app** qilib tanlang.
3. Sozlamalar:
   - **Execute as:** Me (o'zingiz).
   - **Who has access:** Anyone.
4. **Deploy** ni bosing va ruxsat so'ralganda o'z Google hisobingizga ruxsat bering.
5. Chiqqan **Web app URL** ni nusxalang (`https://script.google.com/macros/s/.../exec` ko'rinishida).

### 3. HTML'ga URL qo'yish

`index.html` faylida `SCRIPT_URL` qatori bor. Hozir unda amaldagi Web App URL yozilgan.
Yangi deployment (yangi URL) yaratilsa, shu qatorni yangi URL bilan almashtiring:

```js
const SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
```

### 4. Telegram xabarnomasi (ixtiyoriy)

Har bir yangi javob Telegram chatga qisqa xabar bo'lib keladi.

1. Telegram'da [@BotFather](https://t.me/BotFather) orqali bot yarating va tokenni oling.
2. Botni xabar boradigan guruh/kanalga qo'shing (kanal bo'lsa, admin qiling).
3. Chat ID ni aniqlang: guruhga biror xabar yozib,
   `https://api.telegram.org/bot<TOKEN>/getUpdates` ni oching va `chat.id` ni oling
   (guruh/kanal ID'lari odatda `-100...` bilan boshlanadi).
4. Apps Script muharririda `apps-script.gs` dagi qiymatlarni to'ldiring:

   ```js
   const TG_TOKEN = 'PASTE_BOT_TOKEN_HERE';
   const TG_CHAT_ID = 'PASTE_CHAT_ID_HERE';
   ```

5. Qayta e'lon qiling (pastdagi "Eslatma"ga qarang).

Token `PASTE...` bo'lib qolsa, Telegram qismi o'tkazib yuboriladi va javoblar faqat jadvalga yoziladi.
Telegram xatosi jadvalga yozishni to'xtatmaydi.

**Muhim:** haqiqiy tokenni faqat Apps Script muharririga yozing, repozitoriyga commit qilmang.

### 5. Sahifani joylash

Variantlardan biri:

- **GitHub Pages** - bepul, eng qulay: repo yaratib `index.html` ni yuklang va Pages'ni yoqing.
- **Netlify Drop** - [app.netlify.com/drop](https://app.netlify.com/drop) ga faylni tortib tashlang.
- Istalgan hosting'ga yuklash.

Havolani soha vakillariga Telegram va boshqa kanallar orqali tarqating.

## Tahlil

Javoblar `Javoblar` varag'iga qator bo'lib tushadi.
Tahlil uchun Google Sheets'ning o'zida Pivot table (Insert → Pivot table) yoki diagrammalar ishlatish mumkin.
Ko'p variantli javoblar `;` bilan ajratilgan - ularni sanash uchun `COUNTIF(K:K, "*piratchilik*")` ko'rinishidagi formulalar qulay.

## Eslatma

- Kod o'zgartirilsa, Apps Script'da **Deploy → Manage deployments → Edit → New version** qilib qayta e'lon qilish kerak, aks holda eski versiya ishlayveradi.
- Forma `no-cors` rejimida yuboradi, shuning uchun brauzer javob matnini o'qimaydi - bu normal holat.
