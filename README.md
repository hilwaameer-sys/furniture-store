# רהיטי הבית · أثاث البيت

بروتوتايب متجر أثاث احترافي — عبري/عربي، RTL كامل، واتساب، حاسبة متر، مفضّلة + سلّة.

---

## 🚀 النشر على GitHub + Vercel (خطوة بخطوة)

### الخطوة 1 — تشغيل محلي (اختياري)

```bash
npm install
npm run dev
# افتح http://localhost:3000
```

---

### الخطوة 2 — رفع على GitHub

```bash
# من داخل مجلد المشروع:
git init
git add .
git commit -m "first commit — furniture store prototype"

# أنشئ repo جديد على github.com ثم:
git remote add origin https://github.com/اسمك/اسم-الريبو.git
git branch -M main
git push -u origin main
```

---

### الخطوة 3 — نشر على Vercel

1. روح على [vercel.com](https://vercel.com) وسجّل دخول بحساب GitHub
2. اضغط **"Add New → Project"**
3. اختر الريبو اللي رفعتو
4. Vercel بيكتشف Next.js تلقائياً — اضغط **Deploy**
5. خلال دقيقة بيطلع رابط جاهز 🎉

---

## 🔁 أماكن التعديل السريعة

افتح `components/FurnitureStore.jsx` ودوّر على هاي الثوابت:

| الرمز | المكان | الوصف |
|---|---|---|
| `WHATSAPP_NUMBER` | سطر 15 | رقم الواتساب (بدون + أو 00) |
| `INSTALLATION_PRICE` | سطر 16 | سعر التركيب (ثابت) |
| `HERO_IMAGE` | سطر 18 | رابط صورة الهيرو |
| `STORE_INFO` | سطر 21 | العنوان / الهاتف / ساعات العمل |
| `products[].image` | ~سطر 50+ | صور المنتجات |
| `products[].basePrice` | ~سطر 50+ | الأسعار |
| `CATALOGS[].image` | ~سطر 150 | صور الكتالوجات |
| `GALLERY_IMAGES` | ~سطر 160 | صور معرض الزبائن |
| `VIDEO_THUMBS` | ~سطر 170 | صور مصغّرة للفيديوهات |
| `SAMPLE_REVIEWS` | ~سطر 180 | التقييمات النموذجية |

---

## 🗂️ هيكل المشروع

```
furniture-store/
├── app/
│   ├── layout.jsx        ← meta, fonts, html dir="rtl"
│   └── page.jsx          ← الصفحة الرئيسية
├── components/
│   └── FurnitureStore.jsx  ← المكوّن الكامل
├── public/               ← صور محلية (اختياري)
├── next.config.js        ← إعدادات Next.js
├── package.json
└── .gitignore
```

---

## 🔗 ربط لاحق بقاعدة بيانات

المنتجات حالياً static في `products[]`. لربطها بـ Supabase / Shopify:

```js
// في app/page.jsx — بدّل هيك:
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const { data: products } = await supabase.from("products").select("*");
```

ثم مرّر `products` كـ props لـ `FurnitureStore`.

---

Built with Next.js 14 · React 18 · Zero dependencies UI
