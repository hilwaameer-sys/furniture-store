"use client";
/*  ============================================================================
    רהיטי הבית · أثاث البيت  —  Premium Furniture E-commerce Prototype (v2)
    ----------------------------------------------------------------------------
    בהשראת מבנה ההמרה של חנויות רהיטים מובילות (ישירות מהיצרן · ביקורות · גלריה)
    مستوحى من بنية المتاجر الرائدة (مباشرة من المصنع · تقييمات · معرض صور)
    ----------------------------------------------------------------------------
    • שפה ראשית: עברית | اللغة الثانوية: العربية   (RTL لكلا اللغتين)
    • مفضّلة + سلّة + طلب عبر واتساب + حاسبة المتر + شريط سفلي للموبايل
    • بيانات ثابتة — جاهز للربط مع Supabase / Shopify / WooCommerce
    ----------------------------------------------------------------------------
    أماكن التعديل السريعة (ابحث عن 🔁):
      🔁 WHATSAPP_NUMBER · INSTALLATION_PRICE · HERO_IMAGE
      🔁 products[].image / gallery / basePrice / deliveryPrice / pricePerExtraMeter
      🔁 CATALOGS[].image · GALLERY_IMAGES · VIDEO_THUMBS · SAMPLE_REVIEWS
      🔁 STORE_INFO (العنوان / الساعات / الهاتف)
    ============================================================================ */

import React, { useState, useEffect } from "react";

/* ============================== إعدادات عامة ============================== */
const WHATSAPP_NUMBER = "972500000000"; // 🔁 رقم الواتساب (بدون + وبدون 00)
const INSTALLATION_PRICE = 500;          // 🔁 سعر "توصيل + رفع + تركيب"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=70"; // 🔁 صورة الهيرو

/* معلومات المتجر — 🔁 عدّلها */
const STORE_INFO = {
  phoneDisplay: "050-000-0000",
  address: { he: "רחוב הרהיטים 1, אזור התעשייה", ar: "شارع الأثاث 1، المنطقة الصناعية" },
  hoursWeek: { he: "א'–ה': 9:00–19:00", ar: "الأحد–الخميس: 9:00–19:00" },
  hoursFri: { he: "ו' וחג: 9:00–13:00", ar: "الجمعة والعيد: 9:00–13:00" },
};

/* ============================== ألوان / أقمشة ============================== */
const COLOR_SWATCHES = {
  beige: "#D8C3A5", gray: "#A2A2A2", darkgray: "#4C4C4C",
  brown: "#6E4A2A", black: "#1B1815", cream: "#F0E6D4",
};

/* ============================== بيانات المنتجات ============================== */
const products = [
  /* ---------- כיסאות / كراسي ---------- */
  { id: "chair-elegant", category: "chairs",
    name: { he: "כיסא אלגנט", ar: "كرسي إليجانت" },
    desc: { he: "כיסא מרופד אלגנטי בעיצוב נקי לפינת אוכל ולסלון. בד עמיד ונוח.", ar: "كرسي مبطّن أنيق بتصميم نظيف لغرفة الطعام والصالون. قماش متين ومريح." },
    basePrice: 250, oldPrice: 390, // 🔁 السعر الأساسي / السعر قبل الخصم
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=70",
    gallery: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=70", "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=70"],
    colors: ["beige", "gray", "brown", "black"], availability: "in_stock",
    isCustomSize: false, deliveryPrice: 200, supportsInstallation: false },

  { id: "chair-dining", category: "chairs",
    name: { he: "כיסא פינת אוכל", ar: "كرسي سفرة" },
    desc: { he: "כיסא קלאסי עם רגלי עץ מלא וריפוד איכותי. חוזק ונוחות יחד.", ar: "كرسي كلاسيكي مع أرجل خشب طبيعي وتبطين عالي الجودة. متانة وراحة." },
    basePrice: 300, oldPrice: 450,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=70",
    gallery: ["https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=70"],
    colors: ["beige", "gray", "darkgray", "cream"], availability: "in_stock",
    isCustomSize: false, deliveryPrice: 200, supportsInstallation: false },

  { id: "chair-modern", category: "chairs",
    name: { he: "כיסא מודרני", ar: "كرسي مودرن" },
    desc: { he: "כיסא בעיצוב מודרני עם קווים מינימליסטיים, מושלם למשרד או לבית.", ar: "كرسي بتصميم عصري وخطوط بسيطة، مثالي للمكتب أو البيت." },
    basePrice: 350, oldPrice: 520,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=70",
    gallery: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=70"],
    colors: ["gray", "darkgray", "black", "cream"], availability: "made_to_order",
    isCustomSize: false, deliveryPrice: 200, supportsInstallation: false },

  /* ---------- מיטות / تخوت ---------- */
  { id: "bed-upholstered", category: "beds",
    name: { he: "מיטה מרופדת", ar: "تخت مبطّن" },
    desc: { he: "מיטה מרופדת בריפוד רך ויוקרתי עם ראש מיטה מעוצב. נוחות מקסימלית.", ar: "تخت مبطّن بقماش ناعم وفاخر مع ظهر مزخرف. راحة قصوى." },
    basePrice: 1800, oldPrice: 2900,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=70",
    gallery: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=70", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=70"],
    colors: ["beige", "gray", "brown", "cream"], availability: "in_stock",
    isCustomSize: false, deliveryPrice: 200, supportsInstallation: true },

  { id: "bed-double", category: "beds",
    name: { he: "מיטה זוגית", ar: "تخت زوجي" },
    desc: { he: "מיטה זוגית רחבה ויציבה בעיצוב מודרני. גימור מוקפד.", ar: "تخت زوجي واسع وثابت بتصميم عصري. تشطيب متقن." },
    basePrice: 2200, oldPrice: 3400,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=70",
    gallery: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=70", "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=70"],
    colors: ["beige", "gray", "darkgray", "brown"], availability: "in_stock",
    isCustomSize: false, deliveryPrice: 200, supportsInstallation: true },

  { id: "bed-storage", category: "beds",
    name: { he: "מיטה עם ארגז מצעים", ar: "تخت مع صندوق تخزين" },
    desc: { he: "מיטה חכמה עם ארגז מצעים מרווח — פתרון אחסון מושלם.", ar: "تخت ذكي مع صندوق تخزين واسع — حل تخزين مثالي." },
    basePrice: 2600, oldPrice: 3900,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=70",
    gallery: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=70"],
    colors: ["beige", "gray", "brown", "black"], availability: "made_to_order",
    isCustomSize: false, deliveryPrice: 250, supportsInstallation: true },

  /* ---------- סלונים / صالونات (מידה אישית) ---------- */
  { id: "salon-royal", category: "salons",
    name: { he: "סלון רויאל", ar: "صالون رويال" },
    desc: { he: "סלון רויאל יוקרתי בהתאמה אישית. בחרו מידה, צבע ובד.", ar: "صالون رويال فاخر بتفصيل حسب الطلب. اختر المقاس، اللون والقماش." },
    basePrice: 2000, baseMeters: 5, pricePerExtraMeter: 400, isCustomSize: true,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=70",
    gallery: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=70", "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=70", "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=900&q=70"],
    colors: ["beige", "gray", "darkgray", "brown", "black", "cream"], availability: "made_to_order",
    deliveryPrice: 200, supportsInstallation: true },

  { id: "salon-corner", category: "salons",
    name: { he: "סלון פינתי", ar: "صالون زاوية" },
    desc: { he: "סלון פינתי מרווח שמנצל כל פינה. נוחות ועיצוב מודרני.", ar: "صالون زاوية واسع يستغل كل ركن. راحة وتصميم عصري." },
    basePrice: 2500, baseMeters: 5, pricePerExtraMeter: 450, isCustomSize: true,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=70",
    gallery: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=70", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=70"],
    colors: ["beige", "gray", "brown", "cream"], availability: "made_to_order",
    deliveryPrice: 250, supportsInstallation: true },

  { id: "salon-modern", category: "salons",
    name: { he: "סלון מודרני", ar: "صالون مودرن" },
    desc: { he: "סלון בעיצוב מודרני ויוקרתי, קווים נקיים ובדים פרימיום.", ar: "صالون بتصميم عصري وفاخر، خطوط نظيفة وأقمشة بريميوم." },
    basePrice: 3000, baseMeters: 5, pricePerExtraMeter: 500, isCustomSize: true,
    image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=900&q=70",
    gallery: ["https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=900&q=70", "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=70"],
    colors: ["gray", "darkgray", "black", "cream"], availability: "made_to_order",
    deliveryPrice: 300, supportsInstallation: true },
];

/* الكتالوجات — 🔁 صور الكتالوجات */
const CATALOGS = [
  { key: "salons", name: { he: "קטלוג סלונים", ar: "كتالوج الصالونات" }, image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=800&q=60" },
  { key: "beds", name: { he: "קטלוג מיטות", ar: "كتالوج التخوت" }, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60" },
  { key: "chairs", name: { he: "קטלוג כיסאות", ar: "كتالوج الكراسي" }, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=60" },
  { key: "fabrics", name: { he: "צבעים ובדים", ar: "الألوان والأقمشة" }, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=60" },
];

/* صور المعرض (بيوت الزبائن) — 🔁 استبدلها بصور حقيقية */
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=60",
];

/* فيديوهات شهادات (thumbnails) — 🔁 ضع روابط YouTube لاحقاً في href */
const VIDEO_THUMBS = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=500&q=60",
];

/* وسائل الدفع المقبولة */
const PAYMENTS = ["Visa", "MasterCard", "Amex", "Bit", "Paybox"];

/* ============================== الترجمات ============================== */
const t = {
  he: {
    brand: "רהיטי הבית",
    promo: "✦ ישירות מהיצרן · משלוח לכל הארץ · אחריות מלאה ✦",
    nav: { home: "דף הבית", catalog: "קטלוג", colors: "צבעים ובדים", gallery: "גלריה", reviews: "המלצות", contact: "צור קשר" },
    whatsappBtn: "וואטסאפ",
    switchTo: "العربية",
    hero: {
      eyebrow: "ישירות מהיצרן לצרכן · ללא פערי תיווך",
      title: "אותו ריהוט — ישירות מהיצרן אליכם",
      subtitle: "סלונים, מיטות וכיסאות באיכות של החנויות הגדולות, בלי פערי תיווך. בחירת מידה, צבע, הובלה והרכבה — והכול בוואטסאפ.",
      cta1: "צפו בקטלוג", cta2: "הזמנה בוואטסאפ",
    },
    stats: [
      { num: "40%", label: "חיסכון במחיר" },
      { num: "+300", label: "ביקורות חיוביות" },
      { num: "100%", label: "שביעות רצון" },
      { num: "+100", label: "גוונים ובדים" },
    ],
    trustStrip: ["ישירות מהיצרן", "אחריות מלאה", "משלוח ארצי", "+100 צבעים"],
    valueTitle: "אותה איכות — מחיר ישיר מהיצרן",
    valueText: "אנחנו מייצרים את אותם רהיטים שנמכרים בחנויות הגדולות, ומספקים אותם ישירות אליכם — בלי פערי תיווך. כך אתם מקבלים איכות גבוהה במחיר הוגן, עם בחירת מידה, צבע ובד.",
    valueWa: "שלחו הצעה להשוואת מחיר",
    categoriesTitle: "הקטגוריות שלנו",
    categoriesSub: "שלוש משפחות מוצרים, כולן בהתאמה אישית.",
    categories: {
      chairs: { title: "כיסאות", desc: "כיסאות מעוצבים לפינת אוכל, סלון ומשרד." },
      beds: { title: "מיטות", desc: "מיטות איכותיות בעיצובים מודרניים ונוחים." },
      salons: { title: "סלונים", desc: "סלונים בהתאמה אישית לפי מידה, צבע וסגנון." },
    },
    viewProducts: "צפו במוצרים",
    catalogTitle: "הקטלוג שלנו",
    catalogSub: "בחרו מוצר, התאימו אותו אישית והזמינו בוואטסאפ.",
    popular: "הפופולריים ביותר",
    filters: { all: "הכל", chairs: "כיסאות", beds: "מיטות", salons: "סלונים", favorites: "מועדפים" },
    from: "החל מ־", was: "במקום",
    choose: "בחר אפשרויות", quickWa: "הזמנה מהירה",
    badges: { in_stock: "במלאי", made_to_order: "ייצור בהתאמה", out_of_stock: "אזל מהמלאי" },
    empty: "אין מוצרים להצגה כרגע.",
    emptyFav: "עדיין לא הוספתם מוצרים למועדפים.",
    modal: { color: "בחירת צבע", summary: "סיכום הזמנה", order: "הזמנה בוואטסאפ", addCart: "הוספה לסל", close: "סגירה", options: "הובלה והרכבה" },
    calc: { baseSize: "מידה בסיסית", basePrice: "מחיר בסיסי", extraMeters: "תוספת מטרים", extraPrice: "תוספת למחיר", productPrice: "מחיר מוצר", meter: "מטר", pick: "בחרו מידה" },
    options: { deliveryHome: "הובלה לבית הלקוח", install: "הובלה + העלאה + הרכבה" },
    summary: { base: "מחיר בסיסי", extra: "תוספת מטרים", delivery: "הובלה", install: "הובלה והרכבה", total: "סה״כ לתשלום" },
    catalogsTitle: "קטלוגים ודוגמאות",
    catalogsSub: "עיינו בקטלוגים המלאים שלנו.",
    viewCatalog: "צפייה בקטלוג",
    colorsTitle: "בחרו את הצבע המושלם",
    colorsSub: "מעל 100 גוונים ובדים איכותיים — נשמח להציג דוגמאות פיזית.",
    colorNames: { beige: "בז'", gray: "אפור", darkgray: "אפור כהה", brown: "חום", black: "שחור", cream: "שמנת" },
    reviewsTitle: "לקוחות אמיתיים מספרים",
    reviewsSub: "מאות לקוחות מרוצים בכל הארץ.",
    ratingLabel: "דירוג ממוצע",
    videosTitle: "סרטוני המלצה מלקוחות",
    videosSub: "הצצה אמיתית לחוויית הלקוחות שלנו.",
    galleryTitle: "תמונות מבתי לקוחותינו",
    gallerySub: "מאות התקנות אמיתיות בבתי לקוחות.",
    trustTitle: "למה לבחור בנו",
    trust: ["ייצור בהתאמה אישית", "הובלה לכל האזורים", "אפשרות הרכבה", "שירות בוואטסאפ", "מחירים ישירות מהיצרן", "בחירת צבע ומידה"],
    contactTitle: "צרו קשר",
    contactSub: "השאירו פרטים ונחזור אליכם בוואטסאפ.",
    contactPhone: "טלפון", contactHours: "שעות פעילות", contactAddress: "כתובת",
    contact: { name: "שם מלא", phone: "טלפון", product: "מוצר שמעניין אותך", message: "הודעה", submit: "שלחו הודעה בוואטסאפ", pName: "ישראל ישראלי", pPhone: "050-0000000", pProduct: "לדוגמה: סלון פינתי", pMsg: "כתבו לנו כאן..." },
    footer: { about: "רהיטים איכותיים בהתאמה אישית לבית שלכם — סלונים, מיטות וכיסאות עם שירות, הובלה והרכבה.", cats: "קטגוריות", links: "קישורים מהירים", contactCol: "צור קשר", payments: "אמצעי תשלום", rights: "כל הזכויות שמורות" },
    quickLinks: ["קטלוג", "צבעים ובדים", "גלריה", "המלצות", "צור קשר"],
    cart: { title: "סל ההזמנות", empty: "הסל ריק. הוסיפו מוצרים כדי להזמין.", total: "סה״כ", checkout: "השלמת הזמנה בוואטסאפ", remove: "הסרה", items: "פריטים" },
    bottom: { home: "בית", catalog: "מוצרים", fav: "מועדפים", cart: "סל", wa: "וואטסאפ" },
    wa: { intro: "שלום, אני מעוניין להזמין:", cartIntro: "שלום, אני מעוניין להזמין את הפריטים הבאים:", product: "מוצר", category: "קטגוריה", size: "מידה", color: "צבע", base: "מחיר בסיסי", extra: "תוספת מטרים", delivery: "הובלה", install: "הובלה והרכבה", total: "סה״כ", grand: "סה״כ כולל", meterUnit: "מטר", item: "פריט", contactIntro: "שלום, פנייה חדשה מהאתר:", cName: "שם", cPhone: "טלפון", cProduct: "מוצר", cMessage: "הודעה" },
  },
  ar: {
    brand: "أثاث البيت",
    promo: "✦ مباشرة من المصنع · توصيل لكل البلاد · كفالة كاملة ✦",
    nav: { home: "الصفحة الرئيسية", catalog: "الكتالوج", colors: "الألوان والأقمشة", gallery: "معرض", reviews: "التقييمات", contact: "تواصل معنا" },
    whatsappBtn: "واتساب",
    switchTo: "עברית",
    hero: {
      eyebrow: "مباشرة من المصنع للزبون · بدون وسيط",
      title: "نفس الأثاث — مباشرة من المصنع لعندك",
      subtitle: "صالونات، تخوت وكراسي بنفس جودة المتاجر الكبيرة وبدون فرق الوسيط. اختر المقاس، اللون، التوصيل والتركيب — وكل شي عبر واتساب.",
      cta1: "شاهد الكتالوج", cta2: "اطلب عبر واتساب",
    },
    stats: [
      { num: "40%", label: "توفير بالسعر" },
      { num: "+300", label: "تقييم إيجابي" },
      { num: "100%", label: "رضا الزبائن" },
      { num: "+100", label: "لون وقماش" },
    ],
    trustStrip: ["مباشرة من المصنع", "كفالة كاملة", "توصيل لكل المناطق", "+100 لون"],
    valueTitle: "نفس الجودة — سعر مباشر من المصنع",
    valueText: "بنصنع نفس الأثاث اللي بينباع بالمتاجر الكبيرة وبنوصّلو لعندك مباشرة — بدون فرق الوسيط. هيك بتاخد جودة عالية بسعر منصف، مع اختيار المقاس، اللون والقماش.",
    valueWa: "ابعت عرض سعر للمقارنة",
    categoriesTitle: "أقسامنا",
    categoriesSub: "ثلاث عائلات منتجات، كلها بتفصيل حسب الطلب.",
    categories: {
      chairs: { title: "كراسي", desc: "كراسي بتصاميم أنيقة لغرف الطعام، الصالون والمكتب." },
      beds: { title: "تخوت", desc: "تخوت مريحة وعصرية بجودة عالية." },
      salons: { title: "صالونات", desc: "صالونات بتفصيل حسب المقاس، اللون والستايل." },
    },
    viewProducts: "شاهد المنتجات",
    catalogTitle: "الكتالوج",
    catalogSub: "اختر المنتج، خصّصه واطلب عبر واتساب.",
    popular: "الأكثر مبيعاً",
    filters: { all: "الكل", chairs: "كراسي", beds: "تخوت", salons: "صالونات", favorites: "المفضلة" },
    from: "ابتداءً من", was: "بدل",
    choose: "اختر الخيارات", quickWa: "طلب سريع",
    badges: { in_stock: "متوفر", made_to_order: "تفصيل حسب الطلب", out_of_stock: "غير متوفر" },
    empty: "لا توجد منتجات للعرض حالياً.",
    emptyFav: "ما أضفت أي منتج للمفضلة بعد.",
    modal: { color: "اختيار اللون", summary: "ملخص الطلب", order: "اطلب عبر واتساب", addCart: "أضف للسلّة", close: "إغلاق", options: "التوصيل والتركيب" },
    calc: { baseSize: "القياس الأساسي", basePrice: "السعر الأساسي", extraMeters: "الزيادة بالأمتار", extraPrice: "الزيادة بالسعر", productPrice: "سعر المنتج", meter: "متر", pick: "اختر المقاس" },
    options: { deliveryHome: "توصيل لبيت الزبون", install: "توصيل + نقل + تركيب" },
    summary: { base: "السعر الأساسي", extra: "زيادة الأمتار", delivery: "التوصيل", install: "التوصيل والتركيب", total: "المجموع النهائي" },
    catalogsTitle: "كتالوجات ونماذج",
    catalogsSub: "تصفّح كتالوجاتنا الكاملة.",
    viewCatalog: "مشاهدة الكتالوج",
    colorsTitle: "اختاروا اللون المثالي",
    colorsSub: "أكثر من 100 لون وقماش عالي الجودة — يسعدنا أن نريكم عينات على الواقع.",
    colorNames: { beige: "بيج", gray: "رمادي", darkgray: "رمادي غامق", brown: "بني", black: "أسود", cream: "كريمي" },
    reviewsTitle: "زبائن حقيقيون يحكوا",
    reviewsSub: "مئات الزبائن الراضين بكل البلاد.",
    ratingLabel: "متوسط التقييم",
    videosTitle: "فيديوهات شهادات الزبائن",
    videosSub: "نظرة حقيقية على تجربة زبائننا.",
    galleryTitle: "صور من بيوت زبائننا",
    gallerySub: "مئات التركيبات الحقيقية في بيوت الزبائن.",
    trustTitle: "ليش تختارنا",
    trust: ["تفصيل حسب الطلب", "توصيل لكل المناطق", "إمكانية التركيب", "خدمة عبر واتساب", "أسعار مباشرة من المصنع", "اختيار اللون والمقاس"],
    contactTitle: "تواصل معنا",
    contactSub: "اترك بياناتك وسنعود إليك عبر واتساب.",
    contactPhone: "هاتف", contactHours: "ساعات العمل", contactAddress: "العنوان",
    contact: { name: "الاسم الكامل", phone: "رقم الهاتف", product: "المنتج المهتم به", message: "رسالة", submit: "إرسال عبر واتساب", pName: "محمد أحمد", pPhone: "050-0000000", pProduct: "مثال: صالون زاوية", pMsg: "اكتب لنا هنا..." },
    footer: { about: "أثاث عالي الجودة بتفصيل يناسب بيتك — صالونات، تخوت وكراسي مع خدمة، توصيل وتركيب.", cats: "الأقسام", links: "روابط سريعة", contactCol: "تواصل معنا", payments: "وسائل الدفع", rights: "جميع الحقوق محفوظة" },
    quickLinks: ["الكتالوج", "الألوان والأقمشة", "المعرض", "التقييمات", "تواصل معنا"],
    cart: { title: "سلّة الطلبات", empty: "السلّة فارغة. أضف منتجات لتطلب.", total: "المجموع", checkout: "إتمام الطلب عبر واتساب", remove: "إزالة", items: "منتجات" },
    bottom: { home: "الرئيسية", catalog: "المنتجات", fav: "المفضلة", cart: "السلّة", wa: "واتساب" },
    wa: { intro: "مرحبا، أنا مهتم بطلب:", cartIntro: "مرحبا، أنا مهتم بطلب المنتجات التالية:", product: "المنتج", category: "القسم", size: "القياس", color: "اللون", base: "السعر الأساسي", extra: "زيادة الأمتار", delivery: "التوصيل", install: "التوصيل والتركيب", total: "المجموع", grand: "المجموع الكلي", meterUnit: "متر", item: "منتج", contactIntro: "مرحبا، استفسار جديد من الموقع:", cName: "الاسم", cPhone: "الهاتف", cProduct: "المنتج", cMessage: "الرسالة" },
  },
};

/* تقييمات نموذجية (ليست تقييمات أي متجر حقيقي) — 🔁 استبدلها بتقييماتك */
const SAMPLE_REVIEWS = [
  { name: { he: "דניאל כ.", ar: "دانيال ك." }, date: "12.2025", stars: 5, text: { he: "שירות מעולה ומקצועי, הסלון הגיע בזמן וההרכבה הייתה מהירה. ממליץ בחום!", ar: "خدمة ممتازة ومهنية، الصالون وصل بالوقت والتركيب كان سريع. بنصح فيهم!" } },
  { name: { he: "מאיה ל.", ar: "مايا ل." }, date: "11.2025", stars: 5, text: { he: "איכות מצוינת במחיר הוגן. עזרו לנו לבחור צבע ובד בסבלנות. מרוצים מאוד.", ar: "جودة ممتازة وسعر منصف. ساعدونا نختار اللون والقماش بصبر. مبسوطين كثير." } },
  { name: { he: "אבי ר.", ar: "آفي ر." }, date: "11.2025", stars: 5, text: { he: "המיטה יציבה ונראית מדהים בחדר. שירות לקוחות ברמה גבוהה.", ar: "التخت ثابت وشكلو رائع بالغرفة. خدمة زبائن بمستوى عالي." } },
  { name: { he: "נור ס.", ar: "نور س." }, date: "10.2025", stars: 5, text: { he: "מחיר ישיר מהיצרן באמת חסך לנו הרבה. נחזור שוב בלי ספק.", ar: "السعر المباشر من المصنع وفّر علينا كثير فعلاً. رح نرجع أكيد." } },
];

/* ============================== أدوات ============================== */
const fmt = (n) => "₪" + Number(n || 0).toLocaleString("en-US");
const waLink = (m) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`;

function lineForProduct(p, cfg, lang) {
  const L = t[lang];
  const extraMeters = p.isCustomSize ? Math.max(0, cfg.meters - p.baseMeters) : 0;
  const extraPrice = extraMeters * (p.pricePerExtraMeter || 0);
  const deliveryPrice = cfg.delivery ? p.deliveryPrice : 0;
  const installPrice = cfg.installation ? INSTALLATION_PRICE : 0;
  const total = p.basePrice + extraPrice + deliveryPrice + installPrice;
  return { extraMeters, extraPrice, deliveryPrice, installPrice, total, L };
}

function buildOrderMessage(p, cfg, lang) {
  const { extraPrice, deliveryPrice, installPrice, total, L } = lineForProduct(p, cfg, lang);
  const w = L.wa;
  const lines = [w.intro, ""];
  lines.push(`${w.product}: ${p.name[lang]}`);
  lines.push(`${w.category}: ${L.categories[p.category].title}`);
  if (p.isCustomSize) lines.push(`${w.size}: ${cfg.meters} ${w.meterUnit}`);
  lines.push(`${w.color}: ${L.colorNames[cfg.color]}`);
  lines.push(`${w.base}: ${fmt(p.basePrice)}`);
  if (extraPrice > 0) lines.push(`${w.extra}: ${fmt(extraPrice)}`);
  if (deliveryPrice > 0) lines.push(`${w.delivery}: ${fmt(deliveryPrice)}`);
  if (installPrice > 0) lines.push(`${w.install}: ${fmt(installPrice)}`);
  lines.push(`${w.total}: ${fmt(total)}`);
  return lines.join("\n");
}

function buildQuickMessage(p, lang) {
  const L = t[lang], w = L.wa;
  return [w.intro, "", `${w.product}: ${p.name[lang]}`, `${w.category}: ${L.categories[p.category].title}`, `${w.base}: ${fmt(p.basePrice)}`].join("\n");
}

function buildCartMessage(cart, lang) {
  const L = t[lang], w = L.wa;
  const lines = [w.cartIntro, ""];
  let grand = 0;
  cart.forEach((it, i) => {
    grand += it.total;
    lines.push(`${i + 1}) ${it.name[lang]}` + (it.meters ? ` · ${it.meters} ${w.meterUnit}` : "") + ` · ${L.colorNames[it.color]} — ${fmt(it.total)}`);
  });
  lines.push("");
  lines.push(`${w.grand}: ${fmt(grand)}`);
  return lines.join("\n");
}

/* ============================== أيقونات ============================== */
const Icon = {
  whatsapp: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7L7 20.4A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 1 1 7 4z" /></svg>),
  truck: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10 17h4V5H2v12h3" /><path d="M14 9h4l3 3v5h-4" /><circle cx="7.5" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></svg>),
  tools: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.6 2.6-2.1-2.1z" /></svg>),
  ruler: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7l14 14 4-4L7 3z" /><path d="M7.5 7.5l1.5 1.5M11 11l1.5 1.5M14.5 14.5l1.5 1.5" /></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6L9 17l-5-5" /></svg>),
  shield: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" /><path d="M9.5 12.5l2 2 3.5-4" /></svg>),
  factory: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 21V9l6 4V9l6 4V6h3v15z" /><path d="M3 21h18" /></svg>),
  palette: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3a9 9 0 1 0 0 18c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-.9.8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.3-9-7.3z" /></svg>),
  tag: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.6 13.4 12 22l-9-9V4h9z" /><circle cx="7.5" cy="7.5" r="1.3" /></svg>),
  phone: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>),
  menu: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>),
  close: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>),
  chevron: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
  globe: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" /></svg>),
  sofa: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3" /><path d="M2 13a2 2 0 0 1 2-2 2 2 0 0 1 2 2v3h12v-3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5H2z" /><path d="M5 18v2M19 18v2" /></svg>),
  heart: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-4.6-9.3-9C1 8.5 2.5 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.5 0 5 3.5 3.3 7-2.3 4.4-9.3 9-9.3 9z" /></svg>),
  heartFill: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M12 21s-7-4.6-9.3-9C1 8.5 2.5 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.5 0 5 3.5 3.3 7-2.3 4.4-9.3 9-9.3 9z" /></svg>),
  cart: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h2.5l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h8.8a1.5 1.5 0 0 0 1.5-1.2L21 7H6" /></svg>),
  star: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M12 2l2.9 6.3 6.8.7-5.1 4.6 1.5 6.7L12 17.8 5.9 20.6l1.5-6.7L2.3 9l6.8-.7z" /></svg>),
  play: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M8 5v14l11-7z" /></svg>),
  home: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></svg>),
  grid: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>),
  pin: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>),
  clock: (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
};

/* ============================== صورة مع بديل ============================== */
function SmartImage({ src, alt, className, style, tone = "warm" }) {
  const [failed, setFailed] = useState(false);
  const grads = { warm: "linear-gradient(135deg,#efe4d3,#e3d2b8)", cool: "linear-gradient(135deg,#e7e2da,#d6cdbd)", dark: "linear-gradient(135deg,#e9ddca,#cdb79b)" };
  if (failed || !src) return (<div className={className} style={{ ...style, background: grads[tone] || grads.warm, display: "flex", alignItems: "center", justifyContent: "center", color: "#a98f63" }}><Icon.sofa style={{ fontSize: "2.4rem", opacity: 0.6 }} /></div>);
  return <img src={src} alt={alt || ""} loading="lazy" className={className} style={style} onError={() => setFailed(true)} />;
}

function Stars({ n = 5, size = "1rem" }) {
  return (<span style={{ display: "inline-flex", color: "var(--star)", fontSize: size, gap: 1 }}>{Array.from({ length: n }).map((_, i) => <Icon.star key={i} />)}</span>);
}

/* ============================== الأنماط ============================== */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700;900&family=Heebo:wght@300;400;500;600;700;800&family=El+Messiri:wght@500;600;700&family=Tajawal:wght@300;400;500;700;800&display=swap');
:root{
  --bg:#FBF8F3; --bg-alt:#F3ECDF; --surface:#FFFFFF;
  --ink:#221C17; --ink-soft:#574C42; --muted:#8C7F6E;
  --brand:#C28A3C; --brand-deep:#A06E26; --brand-soft:#F2E2C3;
  --dark:#211B16; --sand:#E6DAC6; --sand2:#D6C3A4;
  --wa:#25D366; --wa-deep:#1da851; --star:#E4A92A; --ok:#2F8F52; --save:#1f8a4c;
}
.fh-root *{box-sizing:border-box;}
.fh-root{font-family:'Heebo','Tajawal',system-ui,sans-serif;color:var(--ink);background:var(--bg);direction:rtl;line-height:1.6;-webkit-font-smoothing:antialiased;padding-bottom:64px;}
.fh-root img{display:block;max-width:100%;}
.fh-display{font-family:'Frank Ruhl Libre','El Messiri',Georgia,serif;line-height:1.16;letter-spacing:-.01em;}
.fh-eyebrow{font-size:.76rem;letter-spacing:.16em;text-transform:uppercase;color:var(--brand-deep);font-weight:700;}
.fh-section{max-width:1180px;margin:0 auto;padding:0 20px;}
.fh-h2{font-size:clamp(1.7rem,4vw,2.5rem);}

.fh-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;font-weight:700;border:none;cursor:pointer;border-radius:999px;padding:.85rem 1.5rem;font-size:.95rem;transition:transform .2s,box-shadow .2s,background .2s,border-color .2s;text-decoration:none;font-family:inherit;}
.fh-btn:active{transform:translateY(1px);}
.fh-btn-gold{background:linear-gradient(135deg,var(--brand),var(--brand-deep));color:#fff;box-shadow:0 10px 24px -12px rgba(160,110,38,.8);}
.fh-btn-gold:hover{transform:translateY(-2px);box-shadow:0 14px 30px -12px rgba(160,110,38,.95);}
.fh-btn-wa{background:var(--wa);color:#fff;box-shadow:0 10px 24px -14px rgba(37,211,102,.9);}
.fh-btn-wa:hover{background:var(--wa-deep);transform:translateY(-2px);}
.fh-btn-ghost{background:transparent;color:var(--ink);border:1.5px solid var(--sand2);}
.fh-btn-ghost:hover{border-color:var(--brand);color:var(--brand-deep);}
.fh-btn-sm{padding:.6rem 1rem;font-size:.85rem;}
.fh-btn-block{width:100%;}

.fh-card{background:var(--surface);border:1px solid var(--sand);border-radius:18px;overflow:hidden;transition:transform .3s,box-shadow .3s;}
.fh-card:hover{transform:translateY(-6px);box-shadow:0 24px 48px -28px rgba(64,46,24,.55);}

.fh-badge{position:absolute;top:12px;display:inline-flex;align-items:center;gap:.35rem;font-size:.72rem;font-weight:700;padding:.3rem .7rem;border-radius:999px;}
.fh-badge.in_stock{background:rgba(47,143,82,.95);color:#fff;}
.fh-badge.made_to_order{background:rgba(194,138,60,.97);color:#fff;}
.fh-badge.out_of_stock{background:rgba(120,110,100,.95);color:#fff;}

.fh-swatch{width:38px;height:38px;border-radius:50%;cursor:pointer;border:2px solid #fff;box-shadow:0 0 0 1px var(--sand);transition:transform .15s,box-shadow .15s;}
.fh-swatch:hover{transform:scale(1.08);}
.fh-swatch.active{box-shadow:0 0 0 2px var(--brand);transform:scale(1.06);}

.fh-tape{display:flex;gap:6px;flex-wrap:wrap;}
.fh-meter{flex:1 1 56px;min-width:56px;border:1.5px solid var(--sand2);background:#fff;border-radius:12px;padding:.6rem .2rem .45rem;text-align:center;cursor:pointer;transition:all .18s;}
.fh-meter:hover{border-color:var(--brand-soft);}
.fh-meter.active{border-color:var(--brand);background:linear-gradient(180deg,#fff,var(--bg-alt));box-shadow:0 6px 16px -10px rgba(160,110,38,.8);}
.fh-meter .num{font-family:'Frank Ruhl Libre','El Messiri',serif;font-size:1.15rem;font-weight:700;}
.fh-meter .unit{font-size:.62rem;color:var(--muted);}
.fh-meter .ticks{display:flex;justify-content:space-between;margin-top:6px;padding:0 4px;}
.fh-meter .ticks span{width:1px;height:6px;background:var(--sand2);}
.fh-meter.active .ticks span{background:var(--brand);}

.fh-opt{display:flex;align-items:center;gap:.75rem;border:1.5px solid var(--sand);border-radius:14px;padding:.8rem 1rem;cursor:pointer;transition:all .18s;background:#fff;}
.fh-opt:hover{border-color:var(--brand-soft);}
.fh-opt.active{border-color:var(--brand);background:var(--bg-alt);}
.fh-checkbox{width:22px;height:22px;border-radius:7px;border:1.8px solid var(--sand2);display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;transition:all .18s;}
.fh-opt.active .fh-checkbox{background:var(--brand);border-color:var(--brand);}

.fh-input{width:100%;border:1.5px solid var(--sand);border-radius:12px;padding:.8rem 1rem;font-family:inherit;font-size:.95rem;background:#fff;color:var(--ink);transition:border-color .18s;}
.fh-input:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px rgba(194,138,60,.14);}
.fh-input::placeholder{color:#bcae9b;}

.fh-reveal{opacity:0;transform:translateY(22px);transition:opacity .7s,transform .7s;}
.fh-reveal.fh-in{opacity:1;transform:none;}

.fh-iconbtn{position:relative;width:42px;height:42px;border-radius:12px;border:1.5px solid var(--sand);background:#fff;display:flex;align-items:center;justify-content:center;font-size:1.2rem;cursor:pointer;color:var(--ink);transition:all .18s;}
.fh-iconbtn:hover{border-color:var(--brand);color:var(--brand-deep);}
.fh-count{position:absolute;top:-6px;inset-inline-end:-6px;min-width:18px;height:18px;border-radius:9px;background:var(--brand);color:#fff;font-size:.68rem;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 4px;}

.fh-fav{position:absolute;top:10px;inset-inline-end:10px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.92);backdrop-filter:blur(4px);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:var(--muted);transition:all .18s;box-shadow:0 4px 10px -6px rgba(0,0,0,.4);}
.fh-fav:hover{transform:scale(1.08);}
.fh-fav.on{color:#d6483f;}

.fh-overlay{position:fixed;inset:0;background:rgba(33,27,22,.55);backdrop-filter:blur(4px);z-index:90;display:flex;align-items:flex-end;justify-content:center;animation:fhFade .25s;}
@media(min-width:768px){.fh-overlay{align-items:center;padding:24px;}}
.fh-modal{background:var(--bg);width:100%;max-width:920px;max-height:94vh;overflow-y:auto;border-radius:22px 22px 0 0;animation:fhUp .3s cubic-bezier(.2,.8,.2,1);}
@media(min-width:768px){.fh-modal{border-radius:22px;}}
.fh-drawer{position:fixed;top:0;inset-inline-start:0;height:100%;width:min(420px,92vw);background:var(--bg);z-index:95;box-shadow:0 0 60px rgba(0,0,0,.3);display:flex;flex-direction:column;animation:fhSlide .3s ease;}
@keyframes fhFade{from{opacity:0}to{opacity:1}}
@keyframes fhUp{from{transform:translateY(40px);opacity:.4}to{transform:none;opacity:1}}
@keyframes fhSlide{from{transform:translateX(-30px);opacity:.4}to{transform:none;opacity:1}}
@keyframes fhPulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}50%{box-shadow:0 0 0 12px rgba(37,211,102,0)}}

.fh-fab{position:fixed;inset-inline-start:18px;bottom:80px;z-index:70;width:56px;height:56px;border-radius:50%;background:var(--wa);color:#fff;display:none;align-items:center;justify-content:center;font-size:1.7rem;box-shadow:0 12px 30px -8px rgba(37,211,102,.7);animation:fhPulse 2.4s infinite;border:none;cursor:pointer;text-decoration:none;}

.fh-bottombar{position:fixed;bottom:0;inset-inline:0;z-index:75;background:rgba(251,248,243,.97);backdrop-filter:blur(10px);border-top:1px solid var(--sand);display:flex;height:62px;}
.fh-bottombar a,.fh-bottombar button{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;background:none;border:none;cursor:pointer;color:var(--ink-soft);font-family:inherit;font-size:.66rem;font-weight:600;text-decoration:none;position:relative;}
.fh-bottombar .ic{font-size:1.3rem;}
.fh-bottombar .wa{color:var(--wa-deep);}

.fh-header{position:sticky;top:0;z-index:60;transition:all .25s;}
.fh-navlink{font-size:.92rem;font-weight:600;color:var(--ink-soft);background:none;border:none;cursor:pointer;font-family:inherit;padding:.3rem 0;position:relative;}
.fh-navlink:hover{color:var(--brand-deep);}
.fh-navlink::after{content:"";position:absolute;bottom:-2px;inset-inline-start:0;width:0;height:2px;background:var(--brand);transition:width .22s;}
.fh-navlink:hover::after{width:100%;}

.fh-color-circle{width:64px;height:64px;border-radius:50%;box-shadow:0 8px 20px -10px rgba(0,0,0,.35),inset 0 0 0 1px rgba(255,255,255,.4);transition:transform .2s;}
.fh-color-circle:hover{transform:translateY(-4px) scale(1.04);}

.fh-pay{padding:5px 10px;border-radius:8px;background:#fff;color:#444;font-size:.7rem;font-weight:800;letter-spacing:.02em;border:1px solid var(--sand);}

@media(min-width:900px){
  .fh-desktop-nav{display:flex!important;}
  .fh-burger{display:none!important;}
  .fh-cta-desktop{display:inline-flex!important;}
  .fh-header-icons{display:flex!important;}
  .fh-bottombar{display:none!important;}
  .fh-fab{display:flex!important;}
  .fh-root{padding-bottom:0!important;}
  .fh-hero-grid{grid-template-columns:1.05fr 1fr!important;gap:48px!important;}
  .fh-modal-grid{grid-template-columns:1fr 1fr!important;}
}
@media (prefers-reduced-motion: reduce){.fh-root *,.fh-reveal{transition:none!important;animation:none!important;}.fh-reveal{opacity:1;transform:none;}}
`;

/* ============================== الهيدر ============================== */
function Header({ lang, setLang, onNav, scrolled, favCount, cartCount, onCart }) {
  const L = t[lang];
  const [open, setOpen] = useState(false);
  const navKeys = ["home", "catalog", "colors", "gallery", "reviews", "contact"];
  const go = (k) => { onNav(k); setOpen(false); };
  return (
    <>
      {/* promo strip */}
      <div style={{ background: "var(--dark)", color: "var(--brand-soft)", textAlign: "center", fontSize: ".8rem", fontWeight: 600, padding: "7px 12px", letterSpacing: ".02em" }}>{L.promo}</div>

      <header className="fh-header" style={{ background: scrolled ? "rgba(251,248,243,.94)" : "rgba(251,248,243,.82)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${scrolled ? "var(--sand)" : "transparent"}`, boxShadow: scrolled ? "0 6px 20px -16px rgba(64,46,24,.6)" : "none" }}>
        <div className="fh-section" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <span style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,var(--brand),var(--dark))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}><Icon.sofa /></span>
            <span className="fh-display" style={{ fontSize: "1.35rem", fontWeight: 700 }}>{L.brand}</span>
          </button>

          <nav className="fh-desktop-nav" style={{ display: "none", alignItems: "center", gap: 20 }}>
            {navKeys.map((k) => (<button key={k} className="fh-navlink" onClick={() => go(k)}>{L.nav[k]}</button>))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button className="fh-btn fh-btn-ghost fh-btn-sm" onClick={() => setLang(lang === "he" ? "ar" : "he")} style={{ gap: 6 }}><Icon.globe /> {L.switchTo}</button>
            <div className="fh-header-icons" style={{ display: "none", gap: 8 }}>
              <button className="fh-iconbtn" onClick={() => go("fav")} aria-label={L.bottom.fav}><Icon.heart />{favCount > 0 && <span className="fh-count">{favCount}</span>}</button>
              <button className="fh-iconbtn" onClick={onCart} aria-label={L.cart.title}><Icon.cart />{cartCount > 0 && <span className="fh-count">{cartCount}</span>}</button>
            </div>
            <a className="fh-btn fh-btn-wa fh-btn-sm fh-cta-desktop" href={waLink(L.wa.intro)} target="_blank" rel="noreferrer" style={{ display: "none" }}><Icon.whatsapp /> {L.whatsappBtn}</a>
            <button className="fh-burger fh-iconbtn" onClick={() => setOpen(!open)} aria-label="menu" style={{ display: "flex" }}>{open ? <Icon.close /> : <Icon.menu />}</button>
          </div>
        </div>

        {open && (
          <div style={{ borderTop: "1px solid var(--sand)", background: "rgba(251,248,243,.99)" }}>
            <div className="fh-section" style={{ padding: "14px 20px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
              {navKeys.map((k) => (<button key={k} className="fh-navlink" onClick={() => go(k)} style={{ textAlign: "start", padding: "11px 4px", borderBottom: "1px solid var(--sand)", fontSize: "1rem" }}>{L.nav[k]}</button>))}
              <a className="fh-btn fh-btn-wa fh-btn-block" href={waLink(L.wa.intro)} target="_blank" rel="noreferrer" style={{ marginTop: 12 }}><Icon.whatsapp /> {L.whatsappBtn}</a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

/* ============================== الهيرو + الإحصائيات ============================== */
function Hero({ lang, onNav }) {
  const L = t[lang];
  return (
    <section id="fh-home" style={{ position: "relative", overflow: "hidden" }}>
      <div className="fh-section">
        <div className="fh-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 28, alignItems: "center", padding: "44px 0 36px" }}>
          <div className="fh-reveal">
            <span className="fh-eyebrow">{L.hero.eyebrow}</span>
            <h1 className="fh-display" style={{ fontSize: "clamp(2.1rem,6vw,3.5rem)", margin: "14px 0 16px" }}>{L.hero.title}</h1>
            <p style={{ fontSize: "1.08rem", color: "var(--ink-soft)", maxWidth: 540, marginBottom: 26 }}>{L.hero.subtitle}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="fh-btn fh-btn-gold" onClick={() => onNav("catalog")}>{L.hero.cta1} <Icon.chevron style={{ transform: "scaleX(-1)" }} /></button>
              <a className="fh-btn fh-btn-wa" href={waLink(L.wa.intro)} target="_blank" rel="noreferrer"><Icon.whatsapp /> {L.hero.cta2}</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 22, color: "var(--muted)", fontSize: ".9rem" }}>
              <Stars n={5} /> <span style={{ fontWeight: 700, color: "var(--ink)" }}>4.9</span> · {L.stats[1].num} {L.stats[1].label}
            </div>
          </div>
          <div className="fh-reveal" style={{ position: "relative" }}>
            <SmartImage src={HERO_IMAGE} alt={L.hero.title} style={{ width: "100%", height: "clamp(280px,46vw,460px)", objectFit: "cover", borderRadius: 24, boxShadow: "0 30px 60px -30px rgba(64,46,24,.6)" }} />
            <div style={{ position: "absolute", insetInlineEnd: -8, bottom: -16, background: "#fff", border: "1px solid var(--sand)", borderRadius: 16, padding: "12px 16px", boxShadow: "0 16px 30px -18px rgba(64,46,24,.5)", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "var(--save)", fontSize: "1.5rem", fontWeight: 800 }} className="fh-display">{L.stats[0].num}</span>
              <div style={{ lineHeight: 1.2 }}><div style={{ fontWeight: 700, fontSize: ".9rem" }}>{L.stats[0].label}</div><div style={{ fontSize: ".75rem", color: "var(--muted)" }}>{lang === "he" ? "ישירות מהיצרן" : "مباشرة من المصنع"}</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* stats row */}
      <div className="fh-section">
        <div className="fh-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, background: "var(--surface)", border: "1px solid var(--sand)", borderRadius: 18, padding: "18px 10px", marginBottom: 8 }}>
          {L.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", borderInlineStart: i ? "1px solid var(--sand)" : "none" }}>
              <div className="fh-display" style={{ fontSize: "clamp(1.3rem,4vw,2rem)", fontWeight: 800, color: "var(--brand-deep)" }}>{s.num}</div>
              <div style={{ fontSize: ".72rem", color: "var(--muted)", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", top: -80, insetInlineStart: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(194,138,60,.16),transparent 70%)", pointerEvents: "none" }} />
    </section>
  );
}

/* شريط المزايا */
function TrustStrip({ lang }) {
  const L = t[lang];
  const icons = [Icon.factory, Icon.shield, Icon.truck, Icon.palette];
  return (
    <section style={{ padding: "26px 0" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
          {L.trustStrip.map((tx, i) => { const I = icons[i]; return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", background: "var(--bg-alt)", borderRadius: 14, padding: "14px 12px" }}>
              <span style={{ color: "var(--brand-deep)", fontSize: "1.4rem" }}><I /></span>
              <span style={{ fontWeight: 700, fontSize: ".92rem" }}>{tx}</span>
            </div>); })}
        </div>
      </div>
    </section>
  );
}

/* قسم القيمة */
function ValueSection({ lang }) {
  const L = t[lang];
  return (
    <section style={{ padding: "30px 0" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ background: "var(--dark)", color: "#f3ece0", borderRadius: 24, padding: "clamp(28px,5vw,48px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <span className="fh-eyebrow" style={{ color: "var(--brand-soft)" }}>{L.stats[0].num} {L.stats[0].label}</span>
          <h2 className="fh-display fh-h2" style={{ color: "#fff", margin: "10px 0 14px" }}>{L.valueTitle}</h2>
          <p style={{ maxWidth: 640, margin: "0 auto 22px", color: "#cfc4b4", fontSize: "1.02rem" }}>{L.valueText}</p>
          <a className="fh-btn fh-btn-wa" href={waLink(L.valueWa)} target="_blank" rel="noreferrer"><Icon.whatsapp /> {L.valueWa}</a>
        </div>
      </div>
    </section>
  );
}

/* الأقسام */
function Categories({ lang, onCategory }) {
  const L = t[lang];
  const tones = { chairs: "cool", beds: "warm", salons: "dark" };
  const imgs = { chairs: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=60", beds: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60", salons: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=800&q=60" };
  return (
    <section style={{ padding: "40px 0" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="fh-eyebrow">{L.brand}</span>
          <h2 className="fh-display fh-h2" style={{ margin: "8px 0 6px" }}>{L.categoriesTitle}</h2>
          <p style={{ color: "var(--muted)" }}>{L.categoriesSub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22 }}>
          {["chairs", "beds", "salons"].map((k) => (
            <div key={k} className="fh-card fh-reveal">
              <SmartImage src={imgs[k]} alt={L.categories[k].title} tone={tones[k]} style={{ width: "100%", height: 210, objectFit: "cover" }} />
              <div style={{ padding: "20px 22px 24px" }}>
                <h3 className="fh-display" style={{ fontSize: "1.4rem", marginBottom: 6 }}>{L.categories[k].title}</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: ".94rem", marginBottom: 18, minHeight: 44 }}>{L.categories[k].desc}</p>
                <button className="fh-btn fh-btn-ghost fh-btn-block" onClick={() => onCategory(k)}>{L.viewProducts} <Icon.chevron style={{ transform: "scaleX(-1)" }} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* بطاقة منتج */
function ProductCard({ p, lang, onOpen, isFav, onFav }) {
  const L = t[lang];
  const startPrice = p.isCustomSize ? `${L.from} ${fmt(p.basePrice)}` : fmt(p.basePrice);
  return (
    <div className="fh-card fh-reveal" style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative" }}>
        <SmartImage src={p.image} alt={p.name[lang]} style={{ width: "100%", height: 230, objectFit: "cover", cursor: "pointer" }} />
        <span className={`fh-badge ${p.availability}`} style={{ insetInlineStart: 12 }}>{L.badges[p.availability]}</span>
        <button className={`fh-fav ${isFav ? "on" : ""}`} onClick={() => onFav(p.id)} aria-label="favorite">{isFav ? <Icon.heartFill /> : <Icon.heart />}</button>
      </div>
      <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <span style={{ fontSize: ".76rem", color: "var(--brand-deep)", fontWeight: 700 }}>{L.categories[p.category].title}</span>
        <h3 className="fh-display" style={{ fontSize: "1.25rem", margin: "4px 0 10px" }}>{p.name[lang]}</h3>
        <div style={{ marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: "1.35rem", fontWeight: 800 }}>{startPrice}</span>
            {p.oldPrice && !p.isCustomSize && (<span style={{ fontSize: ".9rem", color: "var(--muted)", textDecoration: "line-through" }}>{L.was} {fmt(p.oldPrice)}</span>)}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="fh-btn fh-btn-gold fh-btn-sm" style={{ flex: 1 }} onClick={() => onOpen(p)}>{L.choose}</button>
            <a className="fh-btn fh-btn-wa fh-btn-sm" href={waLink(buildQuickMessage(p, lang))} target="_blank" rel="noreferrer" aria-label={L.quickWa}><Icon.whatsapp /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* الكتالوج + الفلاتر */
function Catalog({ lang, filter, setFilter, onOpen, favorites, onFav }) {
  const L = t[lang];
  const cats = ["all", "chairs", "beds", "salons", "favorites"];
  let list = filter === "all" ? products : filter === "favorites" ? products.filter((p) => favorites.includes(p.id)) : products.filter((p) => p.category === filter);
  return (
    <section id="fh-catalog" style={{ padding: "30px 0 50px" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ textAlign: "center", marginBottom: 26 }}>
          <span className="fh-eyebrow">{L.popular}</span>
          <h2 className="fh-display fh-h2" style={{ margin: "8px 0 6px" }}>{L.catalogTitle}</h2>
          <p style={{ color: "var(--muted)" }}>{L.catalogSub}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 30 }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className="fh-btn fh-btn-sm" style={{ background: filter === c ? "linear-gradient(135deg,var(--brand),var(--brand-deep))" : "#fff", color: filter === c ? "#fff" : "var(--ink-soft)", border: filter === c ? "none" : "1.5px solid var(--sand)", display: "inline-flex", gap: 6 }}>
              {c === "favorites" && <Icon.heart />} {L.filters[c]}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <div className="fh-card" style={{ textAlign: "center", padding: "48px 20px", color: "var(--muted)" }}>
            <div style={{ fontSize: "2.4rem", color: "var(--sand2)", display: "flex", justifyContent: "center", marginBottom: 10 }}>{filter === "favorites" ? <Icon.heart /> : <Icon.sofa />}</div>
            {filter === "favorites" ? L.emptyFav : L.empty}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 22 }}>
            {list.map((p) => (<ProductCard key={p.id} p={p} lang={lang} onOpen={onOpen} isFav={favorites.includes(p.id)} onFav={onFav} />))}
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ label, value, strong }) {
  return (<div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: strong ? "var(--ink)" : "var(--ink-soft)", fontWeight: strong ? 700 : 400 }}><span>{label}</span><span>{value}</span></div>);
}

/* مودال المنتج */
function ProductModal({ p, lang, onClose, onAddCart }) {
  const L = t[lang];
  const [meters, setMeters] = useState(p.baseMeters || 0);
  const [color, setColor] = useState(p.colors[0]);
  const [delivery, setDelivery] = useState(false);
  const [installation, setInstallation] = useState(false);
  const [activeImg, setActiveImg] = useState(p.image);
  const [added, setAdded] = useState(false);

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  useEffect(() => { const k = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);

  const { extraPrice, deliveryPrice, installPrice, total } = lineForProduct(p, { meters, color, delivery, installation }, lang);
  const cfg = { meters, color, delivery, installation };
  const meterOptions = p.isCustomSize ? Array.from({ length: 10 - p.baseMeters + 1 }, (_, i) => p.baseMeters + i) : [];
  const gallery = [p.image, ...(p.gallery || [])].filter((v, i, a) => a.indexOf(v) === i);

  const addToCart = () => {
    onAddCart({ uid: Date.now() + "-" + Math.random(), productId: p.id, name: p.name, category: p.category, meters: p.isCustomSize ? meters : null, color, delivery, installation, total });
    setAdded(true); setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="fh-overlay" onClick={onClose}>
      <div className="fh-modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "sticky", top: 0, zIndex: 5, background: "var(--bg)", borderBottom: "1px solid var(--sand)", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div><span style={{ fontSize: ".75rem", color: "var(--brand-deep)", fontWeight: 700 }}>{L.categories[p.category].title}</span><h3 className="fh-display" style={{ fontSize: "1.3rem" }}>{p.name[lang]}</h3></div>
          <button onClick={onClose} className="fh-iconbtn" aria-label={L.modal.close}><Icon.close /></button>
        </div>

        <div className="fh-modal-grid" style={{ display: "grid", gridTemplateColumns: "1fr" }}>
          <div style={{ padding: 20 }}>
            <SmartImage src={activeImg} alt={p.name[lang]} style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 16, border: "1px solid var(--sand)" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {gallery.map((g, i) => (<button key={i} onClick={() => setActiveImg(g)} style={{ padding: 0, border: activeImg === g ? "2px solid var(--brand)" : "2px solid transparent", borderRadius: 10, overflow: "hidden", cursor: "pointer", background: "none" }}><SmartImage src={g} alt="" style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} /></button>))}
            </div>
            <p style={{ color: "var(--ink-soft)", fontSize: ".95rem", marginTop: 16 }}>{p.desc[lang]}</p>
          </div>

          <div style={{ padding: 20, background: "var(--surface)", borderInlineStart: "1px solid var(--sand)" }}>
            {p.isCustomSize && (
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, marginBottom: 10 }}><Icon.ruler style={{ color: "var(--brand)" }} /> {L.calc.pick}</label>
                <div className="fh-tape">
                  {meterOptions.map((m) => (<div key={m} className={`fh-meter ${meters === m ? "active" : ""}`} onClick={() => setMeters(m)}><div className="num">{m}</div><div className="unit">{L.calc.meter}</div><div className="ticks"><span /><span /><span /><span /><span /></div></div>))}
                </div>
                <div style={{ marginTop: 14, background: "var(--bg-alt)", borderRadius: 12, padding: "12px 14px", fontSize: ".88rem" }}>
                  <Row label={L.calc.baseSize} value={`${p.baseMeters} ${L.calc.meter}`} />
                  <Row label={L.calc.basePrice} value={fmt(p.basePrice)} />
                  <Row label={L.calc.extraMeters} value={`${Math.max(0, meters - p.baseMeters)} ${L.calc.meter}`} />
                  <Row label={L.calc.extraPrice} value={fmt(extraPrice)} />
                  <div style={{ borderTop: "1px dashed var(--sand2)", margin: "8px 0" }} />
                  <Row label={L.calc.productPrice} value={fmt(p.basePrice + extraPrice)} strong />
                </div>
              </div>
            )}

            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, marginBottom: 10 }}><Icon.palette style={{ color: "var(--brand)" }} /> {L.modal.color}</label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                {p.colors.map((c) => (<button key={c} onClick={() => setColor(c)} className={`fh-swatch ${color === c ? "active" : ""}`} style={{ background: COLOR_SWATCHES[c] }} title={L.colorNames[c]} aria-label={L.colorNames[c]} />))}
                <span style={{ marginInlineStart: 4, color: "var(--ink-soft)", fontSize: ".9rem" }}>{L.colorNames[color]}</span>
              </div>
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, marginBottom: 10 }}><Icon.truck style={{ color: "var(--brand)" }} /> {L.modal.options}</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className={`fh-opt ${delivery ? "active" : ""}`} onClick={() => setDelivery(!delivery)}><span className="fh-checkbox">{delivery && <Icon.check />}</span><span style={{ flex: 1 }}>{L.options.deliveryHome}</span><span style={{ fontWeight: 700, color: "var(--brand-deep)" }}>{fmt(p.deliveryPrice)}</span></div>
                {p.supportsInstallation && (<div className={`fh-opt ${installation ? "active" : ""}`} onClick={() => setInstallation(!installation)}><span className="fh-checkbox">{installation && <Icon.check />}</span><span style={{ flex: 1 }}>{L.options.install}</span><span style={{ fontWeight: 700, color: "var(--brand-deep)" }}>{fmt(INSTALLATION_PRICE)}</span></div>)}
              </div>
            </div>

            <div style={{ background: "linear-gradient(180deg,var(--bg-alt),#fff)", border: "1px solid var(--sand)", borderRadius: 14, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}><Icon.tag style={{ color: "var(--brand)" }} /> {L.modal.summary}</div>
              <Row label={L.summary.base} value={fmt(p.basePrice)} />
              {p.isCustomSize && extraPrice > 0 && <Row label={L.summary.extra} value={fmt(extraPrice)} />}
              {delivery && <Row label={L.summary.delivery} value={fmt(deliveryPrice)} />}
              {installation && <Row label={L.summary.install} value={fmt(installPrice)} />}
              <div style={{ borderTop: "1px solid var(--sand2)", margin: "10px 0 8px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span style={{ fontWeight: 700 }}>{L.summary.total}</span><span className="fh-display" style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--brand-deep)" }}>{fmt(total)}</span></div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button className="fh-btn fh-btn-ghost" style={{ flex: 1 }} onClick={addToCart}><Icon.cart /> {added ? <Icon.check /> : L.modal.addCart}</button>
              <a className="fh-btn fh-btn-wa" style={{ flex: 1.4 }} href={waLink(buildOrderMessage(p, cfg, lang))} target="_blank" rel="noreferrer"><Icon.whatsapp /> {L.modal.order}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* سلّة الطلبات */
function CartDrawer({ lang, cart, onClose, onRemove }) {
  const L = t[lang];
  const grand = cart.reduce((s, it) => s + it.total, 0);
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  return (
    <div className="fh-overlay" style={{ justifyContent: "flex-start", alignItems: "stretch", padding: 0 }} onClick={onClose}>
      <div className="fh-drawer" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--sand)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 className="fh-display" style={{ fontSize: "1.3rem", display: "flex", alignItems: "center", gap: 8 }}><Icon.cart /> {L.cart.title}</h3>
          <button className="fh-iconbtn" onClick={onClose}><Icon.close /></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", color: "var(--muted)", padding: "60px 16px" }}><div style={{ fontSize: "2.6rem", color: "var(--sand2)", marginBottom: 10 }}><Icon.cart /></div>{L.cart.empty}</div>
          ) : cart.map((it) => (
            <div key={it.uid} style={{ display: "flex", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--sand)" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{it.name[lang]}</div>
                <div style={{ fontSize: ".8rem", color: "var(--muted)" }}>{L.colorNames[it.color]}{it.meters ? ` · ${it.meters} ${L.wa.meterUnit}` : ""}{it.delivery ? ` · ${L.summary.delivery}` : ""}{it.installation ? ` · ${L.summary.install}` : ""}</div>
                <button onClick={() => onRemove(it.uid)} style={{ background: "none", border: "none", color: "#c0564d", fontSize: ".78rem", cursor: "pointer", padding: "4px 0", fontFamily: "inherit" }}>{L.cart.remove}</button>
              </div>
              <div style={{ fontWeight: 800, color: "var(--brand-deep)" }}>{fmt(it.total)}</div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ borderTop: "1px solid var(--sand)", padding: 16, background: "var(--surface)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span style={{ fontWeight: 700 }}>{L.cart.total} ({cart.length} {L.cart.items})</span><span className="fh-display" style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--brand-deep)" }}>{fmt(grand)}</span></div>
            <a className="fh-btn fh-btn-wa fh-btn-block" href={waLink(buildCartMessage(cart, lang))} target="_blank" rel="noreferrer"><Icon.whatsapp /> {L.cart.checkout}</a>
          </div>
        )}
      </div>
    </div>
  );
}

/* الكتالوجات */
function CatalogsSection({ lang }) {
  const L = t[lang];
  return (
    <section style={{ padding: "40px 0", background: "var(--bg-alt)" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="fh-eyebrow">{L.nav.catalog}</span>
          <h2 className="fh-display fh-h2" style={{ margin: "8px 0 6px" }}>{L.catalogsTitle}</h2>
          <p style={{ color: "var(--muted)" }}>{L.catalogsSub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18 }}>
          {CATALOGS.map((c) => (
            <div key={c.key} className="fh-card fh-reveal" style={{ background: "#fff" }}>
              <SmartImage src={c.image} alt={c.name[lang]} style={{ width: "100%", height: 170, objectFit: "cover" }} />
              <div style={{ padding: "16px 18px 20px" }}><h3 className="fh-display" style={{ fontSize: "1.1rem", marginBottom: 12 }}>{c.name[lang]}</h3><a className="fh-btn fh-btn-ghost fh-btn-block fh-btn-sm" href="#fh-contact">{L.viewCatalog} <Icon.chevron style={{ transform: "scaleX(-1)" }} /></a></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* الألوان */
function ColorsSection({ lang }) {
  const L = t[lang];
  const order = ["beige", "gray", "darkgray", "brown", "black", "cream"];
  return (
    <section id="fh-colors" style={{ padding: "50px 0" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ textAlign: "center", marginBottom: 34 }}>
          <span className="fh-eyebrow"><Icon.palette /> {L.stats[3].num} {L.stats[3].label}</span>
          <h2 className="fh-display fh-h2" style={{ margin: "8px 0 6px" }}>{L.colorsTitle}</h2>
          <p style={{ color: "var(--muted)", maxWidth: 560, margin: "0 auto" }}>{L.colorsSub}</p>
        </div>
        <div className="fh-reveal" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 28 }}>
          {order.map((c) => (<div key={c} style={{ textAlign: "center" }}><div className="fh-color-circle" style={{ background: COLOR_SWATCHES[c] }} /><div style={{ marginTop: 10, fontSize: ".9rem", color: "var(--ink-soft)", fontWeight: 600 }}>{L.colorNames[c]}</div></div>))}
        </div>
      </div>
    </section>
  );
}

/* فيديوهات شهادات */
function Videos({ lang }) {
  const L = t[lang];
  return (
    <section style={{ padding: "50px 0", background: "var(--bg-alt)" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ textAlign: "center", marginBottom: 30 }}>
          <span className="fh-eyebrow">{L.nav.reviews}</span>
          <h2 className="fh-display fh-h2" style={{ margin: "8px 0 6px" }}>{L.videosTitle}</h2>
          <p style={{ color: "var(--muted)" }}>{L.videosSub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
          {VIDEO_THUMBS.map((src, i) => (
            /* 🔁 ضع رابط فيديو YouTube في href لاحقاً */
            <a key={i} href="#fh-reviews" className="fh-card fh-reveal" style={{ position: "relative", display: "block" }}>
              <SmartImage src={src} alt="" style={{ width: "100%", height: 220, objectFit: "cover" }} />
              <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: 58, height: 58, borderRadius: "50%", background: "rgba(255,255,255,.92)", color: "var(--brand-deep)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", boxShadow: "0 10px 24px -8px rgba(0,0,0,.5)" }}><Icon.play /></span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* تقييمات */
function Reviews({ lang }) {
  const L = t[lang];
  return (
    <section id="fh-reviews" style={{ padding: "50px 0" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ textAlign: "center", marginBottom: 30 }}>
          <span className="fh-eyebrow">Google · {L.ratingLabel}</span>
          <h2 className="fh-display fh-h2" style={{ margin: "8px 0 6px" }}>{L.reviewsTitle}</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--muted)" }}><Stars n={5} size="1.2rem" /> <span style={{ fontWeight: 800, color: "var(--ink)", fontSize: "1.1rem" }}>4.9</span> · {L.stats[1].num} {L.stats[1].label}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 18 }}>
          {SAMPLE_REVIEWS.map((r, i) => (
            <div key={i} className="fh-card fh-reveal" style={{ padding: "20px 22px", background: "#fff" }}>
              <Stars n={r.stars} />
              <p style={{ margin: "10px 0 16px", color: "var(--ink-soft)", fontSize: ".95rem" }}>“{r.text[lang]}”</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,var(--brand),var(--dark))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{r.name[lang][0]}</span>
                <div><div style={{ fontWeight: 700, fontSize: ".9rem" }}>{r.name[lang]}</div><div style={{ fontSize: ".75rem", color: "var(--muted)" }}>{r.date}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* معرض صور الزبائن */
function Gallery({ lang }) {
  const L = t[lang];
  return (
    <section id="fh-gallery" style={{ padding: "50px 0", background: "var(--bg-alt)" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ textAlign: "center", marginBottom: 30 }}>
          <span className="fh-eyebrow">{L.nav.gallery}</span>
          <h2 className="fh-display fh-h2" style={{ margin: "8px 0 6px" }}>{L.galleryTitle}</h2>
          <p style={{ color: "var(--muted)" }}>{L.gallerySub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
          {GALLERY_IMAGES.map((src, i) => (<SmartImage key={i} src={src} alt="" className="fh-reveal" style={{ width: "100%", height: 170, objectFit: "cover", borderRadius: 14, border: "1px solid var(--sand)" }} />))}
        </div>
      </div>
    </section>
  );
}

/* مزايا (قسم غامق) */
function Trust({ lang }) {
  const L = t[lang];
  const icons = [Icon.ruler, Icon.truck, Icon.tools, Icon.whatsapp, Icon.tag, Icon.palette];
  return (
    <section style={{ padding: "50px 0", background: "var(--dark)", color: "#f3ece0" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ textAlign: "center", marginBottom: 32 }}><span className="fh-eyebrow" style={{ color: "var(--brand-soft)" }}>{L.brand}</span><h2 className="fh-display fh-h2" style={{ marginTop: 8, color: "#fff" }}>{L.trustTitle}</h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
          {L.trust.map((tx, i) => { const I = icons[i] || Icon.check; return (<div key={i} className="fh-reveal" style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,.05)", border: "1px solid rgba(242,226,195,.15)", borderRadius: 14, padding: "16px 18px" }}><span style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,var(--brand),var(--brand-deep))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}><I /></span><span style={{ fontWeight: 600 }}>{tx}</span></div>); })}
        </div>
      </div>
    </section>
  );
}

/* تواصل */
function Contact({ lang }) {
  const L = t[lang];
  const [form, setForm] = useState({ name: "", phone: "", product: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => { const w = L.wa; window.open(waLink([w.contactIntro, "", `${w.cName}: ${form.name}`, `${w.cPhone}: ${form.phone}`, `${w.cProduct}: ${form.product}`, `${w.cMessage}: ${form.message}`].join("\n")), "_blank"); };
  return (
    <section id="fh-contact" style={{ padding: "56px 0" }}>
      <div className="fh-section">
        <div className="fh-reveal" style={{ textAlign: "center", marginBottom: 30 }}><span className="fh-eyebrow">{L.nav.contact}</span><h2 className="fh-display fh-h2" style={{ margin: "8px 0 6px" }}>{L.contactTitle}</h2><p style={{ color: "var(--muted)" }}>{L.contactSub}</p></div>
        <div className="fh-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 22 }}>
          {/* info */}
          <div className="fh-reveal" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href={`tel:${WHATSAPP_NUMBER}`} className="fh-card" style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit" }}><span style={{ color: "var(--brand-deep)", fontSize: "1.4rem" }}><Icon.phone /></span><div><div style={{ fontWeight: 700 }}>{L.contactPhone}</div><div style={{ color: "var(--muted)", direction: "ltr", textAlign: "start" }}>{STORE_INFO.phoneDisplay}</div></div></a>
            <a href={waLink(L.wa.intro)} target="_blank" rel="noreferrer" className="fh-card" style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit" }}><span style={{ color: "var(--wa-deep)", fontSize: "1.4rem" }}><Icon.whatsapp /></span><div><div style={{ fontWeight: 700 }}>WhatsApp</div><div style={{ color: "var(--muted)" }}>{lang === "he" ? "מענה מהיר 24/7" : "رد سريع 24/7"}</div></div></a>
            <div className="fh-card" style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}><span style={{ color: "var(--brand-deep)", fontSize: "1.4rem" }}><Icon.pin /></span><div><div style={{ fontWeight: 700 }}>{L.contactAddress}</div><div style={{ color: "var(--muted)" }}>{STORE_INFO.address[lang]}</div></div></div>
            <div className="fh-card" style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}><span style={{ color: "var(--brand-deep)", fontSize: "1.4rem" }}><Icon.clock /></span><div><div style={{ fontWeight: 700 }}>{L.contactHours}</div><div style={{ color: "var(--muted)" }}>{STORE_INFO.hoursWeek[lang]}</div><div style={{ color: "var(--muted)" }}>{STORE_INFO.hoursFri[lang]}</div></div></div>
          </div>
          {/* form */}
          <div className="fh-reveal fh-card" style={{ background: "#fff", padding: "26px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label={L.contact.name}><input className="fh-input" value={form.name} onChange={set("name")} placeholder={L.contact.pName} /></Field>
              <Field label={L.contact.phone}><input className="fh-input" value={form.phone} onChange={set("phone")} placeholder={L.contact.pPhone} inputMode="tel" /></Field>
            </div>
            <div style={{ marginTop: 14 }}><Field label={L.contact.product}><input className="fh-input" value={form.product} onChange={set("product")} placeholder={L.contact.pProduct} /></Field></div>
            <div style={{ marginTop: 14 }}><Field label={L.contact.message}><textarea className="fh-input" value={form.message} onChange={set("message")} placeholder={L.contact.pMsg} rows={4} style={{ resize: "vertical" }} /></Field></div>
            <button className="fh-btn fh-btn-wa fh-btn-block" onClick={submit} style={{ marginTop: 18, padding: "1rem" }}><Icon.whatsapp /> {L.contact.submit}</button>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){.fh-contact-grid{grid-template-columns:.9fr 1.1fr!important;}}`}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (<label style={{ display: "block" }}><span style={{ display: "block", fontSize: ".85rem", fontWeight: 700, color: "var(--ink-soft)", marginBottom: 6 }}>{label}</span>{children}</label>);
}

/* الفوتر */
function Footer({ lang, onNav, onCategory }) {
  const L = t[lang];
  const linkKeys = ["catalog", "colors", "gallery", "reviews", "contact"];
  return (
    <footer style={{ background: "var(--dark)", color: "#cdc2b2", padding: "48px 0 28px" }}>
      <div className="fh-section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 30, marginBottom: 28 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}><span style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,var(--brand),var(--brand-deep))", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}><Icon.sofa /></span><span className="fh-display" style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff" }}>{L.brand}</span></div>
            <p style={{ fontSize: ".92rem", lineHeight: 1.7, maxWidth: 320 }}>{L.footer.about}</p>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: ".78rem", color: "#9a8f80", marginBottom: 8 }}>{L.footer.payments}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{PAYMENTS.map((pm) => (<span key={pm} className="fh-pay">{pm}</span>))}</div>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: 14, fontWeight: 700 }}>{L.footer.cats}</h4>
            {["chairs", "beds", "salons"].map((k) => (<button key={k} onClick={() => onCategory(k)} style={{ display: "block", background: "none", border: "none", color: "#cdc2b2", cursor: "pointer", padding: "5px 0", fontFamily: "inherit", fontSize: ".92rem" }}>{L.categories[k].title}</button>))}
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: 14, fontWeight: 700 }}>{L.footer.links}</h4>
            {linkKeys.map((k) => (<button key={k} onClick={() => onNav(k)} style={{ display: "block", background: "none", border: "none", color: "#cdc2b2", cursor: "pointer", padding: "5px 0", fontFamily: "inherit", fontSize: ".92rem" }}>{L.nav[k]}</button>))}
          </div>
          <div>
            <h4 style={{ color: "#fff", marginBottom: 14, fontWeight: 700 }}>{L.footer.contactCol}</h4>
            <a href={waLink(L.wa.intro)} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "#cdc2b2", textDecoration: "none", padding: "5px 0", fontSize: ".92rem" }}><Icon.whatsapp style={{ color: "var(--wa)" }} /> WhatsApp</a>
            <a href={`tel:+${WHATSAPP_NUMBER}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "#cdc2b2", textDecoration: "none", padding: "5px 0", fontSize: ".92rem", direction: "ltr", justifyContent: "flex-end" }}><Icon.phone style={{ color: "var(--brand-soft)" }} /> {STORE_INFO.phoneDisplay}</a>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: ".92rem" }}><Icon.pin style={{ color: "var(--brand-soft)" }} /> {STORE_INFO.address[lang]}</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 18, textAlign: "center", fontSize: ".82rem", color: "#9a8f80" }}>© {new Date().getFullYear()} {L.brand} — {L.footer.rights}.</div>
      </div>
    </footer>
  );
}

/* شريط سفلي للموبايل */
function BottomBar({ lang, onNav, favCount, cartCount, onCart }) {
  const L = t[lang];
  return (
    <nav className="fh-bottombar">
      <button onClick={() => onNav("home")}><span className="ic"><Icon.home /></span>{L.bottom.home}</button>
      <button onClick={() => onNav("catalog")}><span className="ic"><Icon.grid /></span>{L.bottom.catalog}</button>
      <button onClick={() => onNav("fav")}><span className="ic"><Icon.heart /></span>{L.bottom.fav}{favCount > 0 && <span className="fh-count">{favCount}</span>}</button>
      <button onClick={onCart}><span className="ic"><Icon.cart /></span>{L.bottom.cart}{cartCount > 0 && <span className="fh-count">{cartCount}</span>}</button>
      <a className="wa" href={waLink(L.wa.intro)} target="_blank" rel="noreferrer"><span className="ic"><Icon.whatsapp /></span>{L.bottom.wa}</a>
    </nav>
  );
}

/* ============================== التطبيق ============================== */
export default function App() {
  const [lang, setLang] = useState("he");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => { document.documentElement.dir = "rtl"; document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { const s = () => setScrolled(window.scrollY > 12); window.addEventListener("scroll", s); return () => window.removeEventListener("scroll", s); }, []);
  useEffect(() => {
    const els = document.querySelectorAll(".fh-reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("fh-in"); io.unobserve(e.target); } }), { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang, filter]);

  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const handleNav = (k) => {
    if (k === "home") scrollTo("fh-home");
    else if (k === "catalog") scrollTo("fh-catalog");
    else if (k === "colors") scrollTo("fh-colors");
    else if (k === "gallery") scrollTo("fh-gallery");
    else if (k === "reviews") scrollTo("fh-reviews");
    else if (k === "contact") scrollTo("fh-contact");
    else if (k === "fav") { setFilter("favorites"); scrollTo("fh-catalog"); }
  };
  const handleCategory = (k) => { setFilter(k); scrollTo("fh-catalog"); };
  const toggleFav = (id) => setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
  const addCart = (item) => setCart((c) => [...c, item]);
  const removeCart = (uid) => setCart((c) => c.filter((x) => x.uid !== uid));

  const L = t[lang];

  return (
    <div className="fh-root">
      <style>{STYLES}</style>

      <Header lang={lang} setLang={setLang} onNav={handleNav} scrolled={scrolled} favCount={favorites.length} cartCount={cart.length} onCart={() => setCartOpen(true)} />
      <Hero lang={lang} onNav={handleNav} />
      <TrustStrip lang={lang} />
      <ValueSection lang={lang} />
      <Categories lang={lang} onCategory={handleCategory} />
      <Catalog lang={lang} filter={filter} setFilter={setFilter} onOpen={setSelected} favorites={favorites} onFav={toggleFav} />
      <CatalogsSection lang={lang} />
      <ColorsSection lang={lang} />
      <Videos lang={lang} />
      <Reviews lang={lang} />
      <Gallery lang={lang} />
      <Trust lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} onNav={handleNav} onCategory={handleCategory} />

      <a className="fh-fab" href={waLink(L.wa.intro)} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon.whatsapp /></a>
      <BottomBar lang={lang} onNav={handleNav} favCount={favorites.length} cartCount={cart.length} onCart={() => setCartOpen(true)} />

      {selected && <ProductModal p={selected} lang={lang} onClose={() => setSelected(null)} onAddCart={addCart} />}
      {cartOpen && <CartDrawer lang={lang} cart={cart} onClose={() => setCartOpen(false)} onRemove={removeCart} />}
    </div>
  );
}
