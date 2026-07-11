# Nashriyot va kitob sohasi — so'rovnoma

Soha vakillarini assotsiatsiya ostida birlashtirishdan avval o'tkaziladigan onlayn so'rovnoma.
Javoblar Google Sheets'da jamlanadi.

## Fayllar

- `index.html` - so'rovnoma sahifasi (foydalanuvchilar to'ldiradi).
- `apps-script.gs` - javoblarni Google Sheets'ga yozadigan server kodi.

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

`index.html` faylida quyidagi qatorni toping:

```js
const SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
```

va nusxalangan URL'ni qo'ying.

### 4. Sahifani joylash

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
