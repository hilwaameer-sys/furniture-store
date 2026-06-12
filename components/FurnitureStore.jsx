"use client";
/*  ============================================================================
    רהיטי הבית · أثاث البيت  — v3  (BigBed-style: teal palette + full hero slider)
    ============================================================================
    🔁 WHATSAPP_NUMBER   → رقم الواتساب
    🔁 HERO_SLIDES[]     → صور + نصوص الهيرو (سلايدر)
    🔁 products[]        → المنتجات (صور / أسعار)
    🔁 STORE_INFO        → العنوان / الهاتف / الساعات
    🔁 INSTALLATION_PRICE
    ============================================================================ */

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ─── إعدادات عامة ───────────────────────────────────────────────────── */
const WHATSAPP_NUMBER   = "972500000000"; // 🔁
const INSTALLATION_PRICE = 500;            // 🔁

const HERO_SLIDES = [
  {
    image: "/hero/hero1.jpeg",
    badge: { he: "ישירות מהמפעל ללא פערי תיווך", ar: "مباشرة من المصنع بدون وسيط" },
    title: { he: "ישירות מהמפעל אליכם", ar: "مباشرة من المصنع لعندك" },
    sub:   { he: "בלי פערי תיווך — מחירים מופקעים", ar: "بدون فرق الوسيط — أسعار منصفة" },
  },
  {
    image: "/hero/hero2.jpeg",
    badge: { he: "מאות ביקורות חיוביות", ar: "مئات التقييمات الإيجابية" },
    title: { he: "איכות שתרגישו כל יום", ar: "جودة ستحسّها كل يوم" },
    sub:   { he: "סלונים ומיטות ברמה גבוהה", ar: "صالونات وتخوت بمستوى عالي" },
  },
  {
    image: "/hero/hero3.jpeg",
    badge: { he: "70% חיסכון במחיר", ar: "توفير 70% بالسعر" },
    title: { he: "אותם מוצרים, רבע מהמחיר", ar: "نفس المنتجات، ربع السعر" },
    sub:   { he: "תשווה את המחיר ותשתכנע", ar: "قارن السعر وستقتنع" },
  },
];

/* 🔁 معلومات المتجر */
const STORE_INFO = {
  phoneDisplay: "050-000-0000",
  address: { he: "רחוב הרהיטים 1, אזור התעשייה", ar: "شارع الأثاث 1، المنطقة الصناعية" },
  hoursWeek: { he: "א'–ה': 9:00–19:00",  ar: "الأحد–الخميس: 9:00–19:00" },
  hoursFri:  { he: "ו' וחג: 9:00–13:00", ar: "الجمعة والعيد: 9:00–13:00" },
};

/* ─── ألوان البالتة (BigBed teal + white) ─────────────────────────────── */
/* 🔁 عدّل هنا إذا بدك تظبط اللون بالضبط */
const PALETTE = `
:root {
  --bg:       #F7F2EA;
  --bg-alt:   #EDE5D8;
  --surface:  #FFFFFF;
  --card:     #E8DCCB;
  --ink:      #1F1F1F;
  --ink-soft: #4A3B2E;
  --muted:    #9C8873;
  --teal:     #5A3E2B;
  --teal-d:   #3E2A1A;
  --teal-l:   #F0E8DA;
  --teal-m:   #C9A24A;
  --wa:       #25D366;
  --wa-d:     #1DA851;
  --star:     #C9A24A;
  --sand:     #DDD0BC;
  --sand2:    #C9B99E;
  --red:      #C0392B;
}`;

/* ─── ألوان الأقمشة ────────────────────────────────────────────────── */
const COLOR_SWATCHES = {
  beige:"#D8C3A5", gray:"#A2A2A2", darkgray:"#4C4C4C",
  brown:"#6E4A2A", black:"#1B1815", cream:"#F0E6D4",
};

const products = [
  /* ─── كيسאות / كراسي ─────────────────────────────── */
  {
    id: "chair-leather", category: "chairs",
    name: { he: "כיסא עור קאמל", ar: "كرسي جلد كاميل" },
    desc: { he: "כיסא מרופד בעור איכותי בגוון קאמל עם רגלי ברזל שחורות. עיצוב מודרני ומרשים.", ar: "كرسي مبطّن بجلد عالي الجودة باللون الكاميل مع أرجل حديد سوداء. تصميم عصري ومميز." },
    basePrice: 500,
    image: "/products/chair-leather-1.jpeg",
    gallery: ["/products/chair-leather-1.jpeg", "/products/chair-leather-2.jpeg"],
    colors: ["brown", "black", "cream", "gray"],
    availability: "in_stock",
    isCustomSize: false, deliveryPrice: 200, supportsInstallation: false,
  },
  {
    id: "chair-round", category: "chairs",
    name: { he: "כורסא עגולה בושלה", ar: "كرسي بوكليه دائري" },
    desc: { he: "כורסא עגולה ומפנקת בבד בושלה רך ונעים למגע. נוחות מקסימלית לסלון.", ar: "كرسي دائري ومريح بقماش بوكليه ناعم. راحة قصوى للصالون." },
    basePrice: 700,
    image: "/products/chair-round-1.jpeg",
    gallery: ["/products/chair-round-1.jpeg"],
    colors: ["cream", "gray", "beige", "black"],
    availability: "in_stock",
    isCustomSize: false, deliveryPrice: 200, supportsInstallation: false,
  },

  /* ─── מיטות / تخوت ────────────────────────────────── */
  {
    id: "bed-luxury", category: "beds",
    name: { he: "מיטה מרופדת לוקסוס", ar: "تخت مبطّن لوكس" },
    desc: { he: "מיטה מרופדת יוקרתית בבד בושלה עם ראש מיטה מעוגל ומודרני. זמין בכל המידות.", ar: "تخت مبطّن فاخر بقماش بوكليه مع ظهر دائري وعصري. متوفر بكل المقاسات." },
    basePrice: 2300,
    image: "/products/bed-upholstered-1.jpeg",
    gallery: ["/products/bed-upholstered-1.jpeg", "/products/bed-upholstered-2.jpeg"],
    colors: ["cream", "beige", "gray", "brown"],
    availability: "in_stock",
    isCustomSize: false, deliveryPrice: 200, supportsInstallation: true,
  },
  {
    id: "bed-single", category: "beds",
    name: { he: "מיטת נוער / חדר בנות", ar: "تخت شبابي / غرفة بنات" },
    desc: { he: "מיטת נוער מרופדת עם ארגז מצעים ענק. מתאימה לחדרי ילדים ונוער.", ar: "تخت شبابي مبطّن مع صندوق تخزين كبير. مناسب لغرف الأطفال والشباب." },
    basePrice: 2500,
    image: "/products/bed-single-1.jpeg",
    gallery: ["/products/bed-single-1.jpeg", "/products/bed-single-2.jpeg"],
    colors: ["beige", "gray", "cream", "brown"],
    availability: "in_stock",
    isCustomSize: false, deliveryPrice: 200, supportsInstallation: true,
  },

  /* ─── סלונים / صالونات ─────────────────────────────── */
  {
    id: "salon-corner", category: "salons",
    name: { he: "סלון פינתי קטיפה", ar: "صالون زاوية مخمل" },
    desc: { he: "סלון פינתי מרווח בבד קטיפה איכותי. בהתאמה אישית לפי מידה, צבע ובד.", ar: "صالون زاوية واسع بقماش مخمل عالي الجودة. بتفصيل حسب المقاس، اللون والقماش." },
    basePrice: 2700, baseMeters: 5, pricePerExtraMeter: 400, isCustomSize: true,
    image: "/products/salon-corner-1.jpeg",
    gallery: ["/products/salon-corner-1.jpeg", "/products/salon-corner-2.jpeg"],
    colors: ["gray", "beige", "cream", "darkgray", "brown", "black"],
    availability: "made_to_order",
    deliveryPrice: 200, supportsInstallation: true,
  },
  {
    id: "salon-royal", category: "salons",
    name: { he: "סלון רויאל", ar: "صالون رويال" },
    desc: { he: "סלון רויאל יוקרתי בבד ריב עשיר. בחרו מידה, צבע ובד לפי הסלון שלכם.", ar: "صالون رويال فاخر بقماش كوردروي. اختر المقاس، اللون والقماش حسب مساحتك." },
    basePrice: 2500, baseMeters: 5, pricePerExtraMeter: 400, isCustomSize: true,
    image: "/products/salon-royal-1.jpeg",
    gallery: ["/products/salon-royal-1.jpeg", "/products/salon-royal-2.jpeg"],
    colors: ["beige", "cream", "gray", "brown", "darkgray", "black"],
    availability: "made_to_order",
    deliveryPrice: 200, supportsInstallation: true,
  },
  {
    id: "salon-modern", category: "salons",
    name: { he: "סלון מודרני מודולרי", ar: "صالون مودرن مودولار" },
    desc: { he: "סלון מודולרי מודרני עם קווים נקיים ובדים פרימיום. נבנה לפי המידות שלכם.", ar: "صالون مودولار عصري بخطوط نظيفة وأقمشة بريميوم. يُصنع حسب مقاساتكم." },
    basePrice: 2300, baseMeters: 5, pricePerExtraMeter: 380, isCustomSize: true,
    image: "/products/salon-modern-1.jpeg",
    gallery: ["/products/salon-modern-1.jpeg", "/products/salon-corner-1.jpeg"],
    colors: ["gray", "cream", "beige", "darkgray", "black"],
    availability: "made_to_order",
    deliveryPrice: 200, supportsInstallation: true,
  },
];

/* כתרים / categories sub-nav */
const SUB_CATS_HE = ["מיטות יהודיות","מיטות זוגיות","מיטות נוער","מזרנים","ארונות","תוספות","ראשי מיטה"];
const SUB_CATS_AR = ["تخوت يهودية","تخوت زوجية","تخوت شبابية","مراتب","خزائن","إضافات","رؤوس تخت"];

/* כרטיסי Gallery */
const GALLERY_IMAGES = [
  "/products/gallery-3.jpeg",
  "/products/gallery-1.jpeg",
  "/products/gallery-2.jpeg",
  "/products/salon-corner-1.jpeg",
  "/products/bed-single-1.jpeg",
  "/products/chair-leather-1.jpeg",
  "/products/salon-royal-1.jpeg",
  "/products/bed-upholstered-1.jpeg",
];

/* وسائل الدفع */
const PAYMENTS = ["Visa","MasterCard","Amex","Bit","Paybox"];

/* تقييمات نموذجية */
const REVIEWS = [
  { name:{ he:"דניאל כ.", ar:"دانيال ك." }, date:"12.2025", stars:5,
    text:{ he:"שירות מעולה ומקצועי, הסלון הגיע בזמן וההרכבה הייתה מהירה. ממליץ בחום!", ar:"خدمة ممتازة، الصالون وصل بالوقت والتركيب كان سريع. بنصح فيهم!" } },
  { name:{ he:"מאיה ל.", ar:"مايا ل." }, date:"11.2025", stars:5,
    text:{ he:"איכות מצוינת במחיר הוגן. עזרו לנו לבחור צבע ובד בסבלנות. מרוצים מאוד.", ar:"جودة ممتازة وسعر منصف. ساعدونا نختار اللون بصبر. مبسوطين كثير." } },
  { name:{ he:"אבי ר.", ar:"آفي ر." }, date:"11.2025", stars:5,
    text:{ he:"המיטה יציבה ונראית מדהים בחדר. שירות לקוחות ברמה גבוהה.", ar:"التخت ثابت وشكلو رائع بالغرفة. خدمة زبائن بمستوى عالي." } },
  { name:{ he:"נור ס.", ar:"نور س." }, date:"10.2025", stars:5,
    text:{ he:"מחיר ישיר מהיצרן באמת חסך לנו הרבה. נחזור שוב בלי ספק.", ar:"السعر المباشر من المصنع وفّر علينا كثير. رح نرجع أكيد." } },
];

/* ─── ترجمات ─────────────────────────────────────────────────────────── */
const T = {
  he:{
    brand:"רהיטי הבית",
    promo:"✦ ישירות מהיצרן · משלוח לכל הארץ · אחריות מלאה ✦",
    nav:{ home:"דף הבית", catalog:"קטלוג", colors:"המחשה מציאותית של הבדים",
          gallery:"גלריה", reviews:"המלצות", about:"אודות", contact:"צרו קשר" },
    waBtn:"וואטסאפ", waFloat:"וואטסאפ", waFloatSub:"דברו איתנו עכשיו!",
    switchTo:"العربية",
    heroBtn1:"בואו לראות", heroBtn2:"הזמנה בוואטסאפ",
    statsRow:[
      { num:"70%", label:"חיסכון במחיר" },
      { num:"+300", label:"ביקורות חיוביות" },
      { num:"100%", label:"שביעות רצון שלכם" },
    ],
    valueTitle:"אותם מוצרים, רבע מהמחיר!",
    valueText:"אנחנו מייצרים את אותם מוצרים שמוכרים לכם בחנויות הגדולות במחירים מופקעים. אצלנו תשלמו רבע מחיר — בלי פערי תיווך. תבדקו אותנו!",
    valueChecks:["ישירות מהיצרן","אחריות מלאה","משלוח ארצי","+100 צבעים"],
    valueCta:"שלחו הצעה להשוואה",
    popularTitle:"הפופולריים ביותר", popularSub:"המוצרים הנמכרים ביותר שלנו",
    allProducts:"כל המוצרים ←",
    cats:{ chairs:"כיסאות", beds:"מיטות", salons:"סלונים" },
    catDesc:{ chairs:"כיסאות מעוצבים לכל הבית.", beds:"מיטות איכותיות בהתאמה אישית.", salons:"סלונים לפי מידה, צבע וסגנון." },
    viewCat:"צפו במוצרים",
    filters:{ all:"הכל", chairs:"כיסאות", beds:"מיטות", salons:"סלונים", fav:"מועדפים" },
    from:"החל מ־", was:"במקום",
    choose:"לבחירת אפשרויות", quickWa:"הזמנה מהירה",
    badges:{ in_stock:"במלאי", made_to_order:"ייצור בהתאמה", out_of_stock:"אזל" },
    empty:"אין מוצרים.", emptyFav:"עדיין לא הוספתם מועדפים.",
    colorsTitle:"בחרו את הצבע המושלם מתוך מאות אפשרויות",
    colorsSub:"כל מוצר זמין במגוון בדים וצבעים איכותיים.",
    colorNames:{ beige:"בז'", gray:"אפור", darkgray:"אפור כהה", brown:"חום", black:"שחור", cream:"שמנת" },
    galleryTitle:"גלריית לקוחות", gallerySub:"תמונות מבתי לקוחותינו +800",
    revTitle:"לקוחות אמיתיים מספרים", revSub:"מאות לקוחות מרוצים בכל הארץ.",
    revRating:"דירוג ממוצע",
    trustTitle:"למה לבחור בנו",
    trust:["ייצור בהתאמה אישית","הובלה לכל האזורים","אפשרות הרכבה","שירות בוואטסאפ","מחירים מהיצרן","בחירת צבע ומידה"],
    contactTitle:"צרו קשר", contactSub:"השאירו פרטים ונחזור אליכם בוואטסאפ.",
    contactLabels:{ name:"שם מלא", phone:"טלפון", product:"מוצר שמעניין אותך", msg:"הודעה", submit:"שלחו הודעה בוואטסאפ" },
    contactPH:{ name:"ישראל ישראלי", phone:"050-0000000", product:"לדוגמה: סלון פינתי", msg:"כתבו לנו כאן..." },
    cart:{ title:"סל הזמנות", empty:"הסל ריק.", total:"סה״כ", checkout:"השלמת הזמנה בוואטסאפ", remove:"הסרה", items:"פריטים" },
    modal:{ color:"בחירת צבע", options:"הובלה והרכבה", summary:"סיכום", order:"הזמנה בוואטסאפ", addCart:"הוספה לסל", close:"סגירה" },
    calc:{ baseSize:"מידה בסיסית", basePrice:"מחיר בסיסי", extra:"תוספת מטרים", extraPrice:"תוספת למחיר", total:"מחיר מוצר", meter:"מטר", pick:"בחרו מידה" },
    opts:{ delivery:"הובלה לבית הלקוח", install:"הובלה + העלאה + הרכבה" },
    sumLabels:{ base:"מחיר בסיסי", extra:"תוספת מטרים", del:"הובלה", inst:"הובלה והרכבה", total:"סה״כ לתשלום" },
    footer:{ about:"רהיטים איכותיים בהתאמה אישית — סלונים, מיטות וכיסאות עם שירות, הובלה והרכבה.", cats:"קטגוריות", links:"קישורים מהירים", contact:"צרו קשר", payments:"אמצעי תשלום", rights:"כל הזכויות שמורות" },
    bottom:{ home:"בית", catalog:"מוצרים", fav:"מועדפים", cart:"סל", wa:"וואטסאפ" },
    wa:{ intro:"שלום, אני מעוניין להזמין:", cartIntro:"שלום, אני מעוניין להזמין:", product:"מוצר", cat:"קטגוריה", size:"מידה", color:"צבע", base:"מחיר בסיסי", extra:"תוספת מטרים", del:"הובלה", inst:"הובלה והרכבה", total:"סה״כ", grand:"סה״כ כולל", m:"מטר", cIntro:"פנייה מהאתר:", cName:"שם", cPhone:"טלפון", cProd:"מוצר", cMsg:"הודעה" },
  },
  ar:{
    brand:"أثاث البيت",
    promo:"✦ مباشرة من المصنع · توصيل لكل البلاد · كفالة كاملة ✦",
    nav:{ home:"الصفحة الرئيسية", catalog:"الكتالوج", colors:"مشاهدة الألوان والأقمشة",
          gallery:"معرض", reviews:"التقييمات", about:"من نحن", contact:"تواصل معنا" },
    waBtn:"واتساب", waFloat:"واتساب", waFloatSub:"تحدث معنا الآن!",
    switchTo:"עברית",
    heroBtn1:"شاهد المنتجات", heroBtn2:"اطلب عبر واتساب",
    statsRow:[
      { num:"70%", label:"توفير بالسعر" },
      { num:"+300", label:"تقييم إيجابي" },
      { num:"100%", label:"رضا الزبائن" },
    ],
    valueTitle:"نفس المنتجات، ربع السعر!",
    valueText:"بنصنع نفس الأثاث اللي بينباع بالمتاجر الكبيرة بأسعار مرتفعة. عندنا بتدفع ربع السعر — بدون فرق الوسيط. قارن وتأكد!",
    valueChecks:["مباشرة من المصنع","كفالة كاملة","توصيل لكل المناطق","+100 لون"],
    valueCta:"ابعت عرض للمقارنة",
    popularTitle:"الأكثر مبيعاً", popularSub:"المنتجات الأكثر مبيعاً عندنا",
    allProducts:"كل المنتجات ←",
    cats:{ chairs:"كراسي", beds:"تخوت", salons:"صالونات" },
    catDesc:{ chairs:"كراسي بتصاميم أنيقة لكل البيت.", beds:"تخوت عالية الجودة بتفصيل حسب الطلب.", salons:"صالونات حسب المقاس، اللون والستايل." },
    viewCat:"شاهد المنتجات",
    filters:{ all:"الكل", chairs:"كراسي", beds:"تخوت", salons:"صالونات", fav:"المفضلة" },
    from:"ابتداءً من", was:"بدل",
    choose:"اختر الخيارات", quickWa:"طلب سريع",
    badges:{ in_stock:"متوفر", made_to_order:"تفصيل حسب الطلب", out_of_stock:"غير متوفر" },
    empty:"لا توجد منتجات.", emptyFav:"ما أضفت أي منتج للمفضلة بعد.",
    colorsTitle:"اختاروا اللون المثالي من مئات الخيارات",
    colorsSub:"كل منتج متوفر بتشكيلة ألوان وأقمشة عالية الجودة.",
    colorNames:{ beige:"بيج", gray:"رمادي", darkgray:"رمادي غامق", brown:"بني", black:"أسود", cream:"كريمي" },
    galleryTitle:"معرض الزبائن", gallerySub:"صور من بيوت زبائننا +800",
    revTitle:"زبائن حقيقيون يحكوا", revSub:"مئات الزبائن الراضين بكل البلاد.",
    revRating:"متوسط التقييم",
    trustTitle:"ليش تختارنا",
    trust:["تفصيل حسب الطلب","توصيل لكل المناطق","إمكانية التركيب","خدمة عبر واتساب","أسعار من المصنع","اختيار اللون والمقاس"],
    contactTitle:"تواصل معنا", contactSub:"اترك بياناتك وسنعود إليك عبر واتساب.",
    contactLabels:{ name:"الاسم الكامل", phone:"رقم الهاتف", product:"المنتج المهتم به", msg:"رسالة", submit:"إرسال عبر واتساب" },
    contactPH:{ name:"محمد أحمد", phone:"050-0000000", product:"مثال: صالون زاوية", msg:"اكتب لنا هنا..." },
    cart:{ title:"سلّة الطلبات", empty:"السلّة فارغة.", total:"المجموع", checkout:"إتمام الطلب عبر واتساب", remove:"إزالة", items:"منتجات" },
    modal:{ color:"اختيار اللون", options:"التوصيل والتركيب", summary:"ملخص الطلب", order:"اطلب عبر واتساب", addCart:"أضف للسلّة", close:"إغلاق" },
    calc:{ baseSize:"القياس الأساسي", basePrice:"السعر الأساسي", extra:"الزيادة بالأمتار", extraPrice:"الزيادة بالسعر", total:"سعر المنتج", meter:"متر", pick:"اختر المقاس" },
    opts:{ delivery:"توصيل لبيت الزبون", install:"توصيل + نقل + تركيب" },
    sumLabels:{ base:"السعر الأساسي", extra:"زيادة الأمتار", del:"التوصيل", inst:"التوصيل والتركيب", total:"المجموع النهائي" },
    footer:{ about:"أثاث عالي الجودة بتفصيل يناسب بيتك — صالونات، تخوت وكراسي مع خدمة، توصيل وتركيب.", cats:"الأقسام", links:"روابط سريعة", contact:"تواصل معنا", payments:"وسائل الدفع", rights:"جميع الحقوق محفوظة" },
    bottom:{ home:"الرئيسية", catalog:"المنتجات", fav:"المفضلة", cart:"السلّة", wa:"واتساب" },
    wa:{ intro:"مرحبا، أنا مهتم بطلب:", cartIntro:"مرحبا، أطلب المنتجات التالية:", product:"المنتج", cat:"القسم", size:"القياس", color:"اللون", base:"السعر الأساسي", extra:"زيادة الأمتار", del:"التوصيل", inst:"التوصيل والتركيب", total:"المجموع", grand:"المجموع الكلي", m:"متر", cIntro:"استفسار من الموقع:", cName:"الاسم", cPhone:"الهاتف", cProd:"المنتج", cMsg:"الرسالة" },
  },
};

/* ─── أدوات ──────────────────────────────────────────────────────────── */
const fmt   = n => "₪" + Number(n||0).toLocaleString("en-US");
const waUrl = m => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`;

function calcOrder(p, cfg){
  const extra   = p.isCustomSize ? Math.max(0, cfg.meters - p.baseMeters) : 0;
  const extraP  = extra * (p.pricePerExtraMeter||0);
  const delP    = cfg.delivery     ? p.deliveryPrice    : 0;
  const instP   = cfg.installation ? INSTALLATION_PRICE : 0;
  return { extra, extraP, delP, instP, total: p.basePrice + extraP + delP + instP };
}

function buildMsg(p, cfg, lang){
  const L = T[lang], w = L.wa;
  const { extra, extraP, delP, instP, total } = calcOrder(p, cfg);
  const lines = [w.intro, ""];
  lines.push(`${w.product}: ${p.name[lang]}`);
  lines.push(`${w.cat}: ${L.cats[p.category]}`);
  if(p.isCustomSize) lines.push(`${w.size}: ${cfg.meters} ${w.m}`);
  lines.push(`${w.color}: ${L.colorNames[cfg.color]}`);
  lines.push(`${w.base}: ${fmt(p.basePrice)}`);
  if(extraP>0)  lines.push(`${w.extra}: ${fmt(extraP)}`);
  if(delP>0)    lines.push(`${w.del}: ${fmt(delP)}`);
  if(instP>0)   lines.push(`${w.inst}: ${fmt(instP)}`);
  lines.push(`${w.total}: ${fmt(total)}`);
  return lines.join("\n");
}
function quickMsg(p, lang){
  const L=T[lang],w=L.wa;
  return [w.intro,"",`${w.product}: ${p.name[lang]}`,`${w.cat}: ${L.cats[p.category]}`,`${w.base}: ${fmt(p.basePrice)}`].join("\n");
}
function cartMsg(cart, lang){
  const L=T[lang],w=L.wa;
  let grand=0;
  const lines=[w.cartIntro,""];
  cart.forEach((it,i)=>{
    grand+=it.total;
    lines.push(`${i+1}) ${it.name[lang]}${it.meters?` · ${it.meters}${w.m}`:""}  · ${L.colorNames[it.color]} — ${fmt(it.total)}`);
  });
  lines.push(""); lines.push(`${w.grand}: ${fmt(grand)}`);
  return lines.join("\n");
}

/* ─── أيقونات SVG ────────────────────────────────────────────────────── */
const Ic = {
  wa:   p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7L7 20.4A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 1 1 7 4z"/></svg>),
  cart: p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.5l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h8.8a1.5 1.5 0 0 0 1.5-1.2L21 7H6"/></svg>),
  heart:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-4.6-9.3-9C1 8.5 2.5 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.5 0 5 3.5 3.3 7-2.3 4.4-9.3 9-9.3 9z"/></svg>),
  heartF:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M12 21s-7-4.6-9.3-9C1 8.5 2.5 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.5 0 5 3.5 3.3 7-2.3 4.4-9.3 9-9.3 9z"/></svg>),
  search:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.4-4.4"/></svg>),
  user: p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="7" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>),
  menu: p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M3 6h18M3 12h18M3 18h18"/></svg>),
  close:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>),
  chevL:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6"/></svg>),
  chevR:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6"/></svg>),
  check:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>),
  star: p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M12 2l2.9 6.3 6.8.7-5.1 4.6 1.5 6.7L12 17.8 5.9 20.6l1.5-6.7L2.3 9l6.8-.7z"/></svg>),
  globe:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>),
  truck:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10 17h4V5H2v12h3"/><path d="M14 9h4l3 3v5h-4"/><circle cx="7.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/></svg>),
  ruler:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7l14 14 4-4L7 3z"/><path d="M7.5 7.5l1.5 1.5M11 11l1.5 1.5M14.5 14.5l1.5 1.5"/></svg>),
  palette:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3a9 9 0 1 0 0 18c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-.9.8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.3-9-7.3z"/></svg>),
  pin:  p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>),
  clock:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>),
  phone:p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>),
  play: p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M8 5v14l11-7z"/></svg>),
  home: p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>),
  grid: p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>),
  sofa: p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 11V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3"/><path d="M2 13a2 2 0 0 1 2-2 2 2 0 0 1 2 2v3h12v-3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5H2z"/><path d="M5 18v2M19 18v2"/></svg>),
  tag:  p=>(<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.6 13.4 12 22l-9-9V4h9z"/><circle cx="7.5" cy="7.5" r="1.3"/></svg>),
};

/* ─── صورة مع بديل ────────────────────────────────────────────────────── */
function Img({ src, alt, style, className }){
  const [err,setErr]=useState(false);
  if(err||!src) return <div className={className} style={{...style,background:"linear-gradient(135deg,#e8efee,#d0dfdc)",display:"flex",alignItems:"center",justifyContent:"center",color:"#8A9BB0"}}><Ic.sofa style={{fontSize:"2.4rem",opacity:.5}}/></div>;
  return <img src={src} alt={alt||""} loading="lazy" className={className} style={style} onError={()=>setErr(true)}/>;
}
function Stars({n=5,size="1rem"}){
  return <span style={{display:"inline-flex",color:"var(--star)",fontSize:size,gap:1}}>{Array.from({length:n}).map((_,i)=><Ic.star key={i}/>)}</span>;
}

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700;900&family=Heebo:wght@300;400;500;600;700;800&family=El+Messiri:wght@500;600;700&family=Tajawal:wght@300;400;500;700;800&display=swap');
${PALETTE}
.r *{box-sizing:border-box;}
.r{font-family:'Heebo','Tajawal',system-ui,sans-serif;color:var(--ink);background:var(--bg);direction:rtl;line-height:1.6;-webkit-font-smoothing:antialiased;padding-bottom:64px;}
.r img{display:block;max-width:100%;}
.disp{font-family:'Frank Ruhl Libre','El Messiri',Georgia,serif;line-height:1.16;letter-spacing:-.01em;}
.sec{max-width:1200px;margin:0 auto;padding:0 20px;}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;font-weight:700;border:none;cursor:pointer;border-radius:999px;padding:.8rem 1.4rem;font-size:.92rem;transition:transform .2s,box-shadow .2s,background .2s;text-decoration:none;font-family:inherit;white-space:nowrap;}
.btn:active{transform:translateY(1px);}
.btn-teal{background:var(--teal);color:#fff;box-shadow:0 8px 20px -12px rgba(26,122,110,.8);}
.btn-teal:hover{background:var(--teal-d);transform:translateY(-2px);}
.btn-wa{background:var(--wa);color:#fff;box-shadow:0 8px 20px -14px rgba(37,211,102,.8);}
.btn-wa:hover{background:var(--wa-d);transform:translateY(-2px);}
.btn-outline{background:#fff;color:var(--teal);border:1.5px solid var(--teal-m);}
.btn-outline:hover{background:var(--teal-l);border-color:var(--teal);}
.btn-ghost{background:transparent;color:var(--ink);border:1.5px solid var(--sand2);}
.btn-ghost:hover{border-color:var(--teal);color:var(--teal);}
.btn-sm{padding:.55rem .9rem;font-size:.82rem;}
.btn-block{width:100%;}

/* card */
.card{background:var(--surface);border:1px solid var(--sand);border-radius:16px;overflow:hidden;transition:transform .3s,box-shadow .3s;}
.card:hover{transform:translateY(-5px);box-shadow:0 20px 40px -24px rgba(26,122,110,.4);}

/* badge */
.bdg{position:absolute;top:10px;display:inline-flex;align-items:center;gap:.3rem;font-size:.7rem;font-weight:700;padding:.28rem .65rem;border-radius:999px;}
.bdg.in_stock{background:rgba(26,122,110,.95);color:#fff;}
.bdg.made_to_order{background:rgba(246,166,35,.97);color:#fff;}
.bdg.out_of_stock{background:rgba(120,110,100,.95);color:#fff;}

/* swatch */
.sw{width:36px;height:36px;border-radius:50%;cursor:pointer;border:2px solid #fff;box-shadow:0 0 0 1px var(--sand);transition:transform .15s,box-shadow .15s;}
.sw:hover{transform:scale(1.08);}
.sw.on{box-shadow:0 0 0 2.5px var(--teal);transform:scale(1.06);}

/* meter tape */
.tape{display:flex;gap:5px;flex-wrap:wrap;}
.mtr{flex:1 1 52px;min-width:52px;border:1.5px solid var(--sand2);background:#fff;border-radius:10px;padding:.5rem .2rem .4rem;text-align:center;cursor:pointer;transition:all .18s;}
.mtr:hover{border-color:var(--teal-m);}
.mtr.on{border-color:var(--teal);background:var(--teal-l);box-shadow:0 4px 12px -8px rgba(26,122,110,.7);}
.mtr .num{font-family:'Frank Ruhl Libre',serif;font-size:1.1rem;font-weight:700;}
.mtr .unt{font-size:.6rem;color:var(--muted);}
.mtr .tks{display:flex;justify-content:space-between;margin-top:5px;padding:0 4px;}
.mtr .tks span{width:1px;height:5px;background:var(--sand2);}
.mtr.on .tks span{background:var(--teal);}

/* opt toggle */
.opt{display:flex;align-items:center;gap:.7rem;border:1.5px solid var(--sand);border-radius:12px;padding:.75rem .9rem;cursor:pointer;transition:all .18s;background:#fff;}
.opt:hover{border-color:var(--teal-m);}
.opt.on{border-color:var(--teal);background:var(--teal-l);}
.chk{width:20px;height:20px;border-radius:6px;border:1.8px solid var(--sand2);display:flex;align-items:center;justify-content:center;color:#fff;flex-shrink:0;transition:all .18s;}
.opt.on .chk{background:var(--teal);border-color:var(--teal);}

/* input */
.inp{width:100%;border:1.5px solid var(--sand);border-radius:10px;padding:.75rem .9rem;font-family:inherit;font-size:.95rem;background:#fff;color:var(--ink);transition:border-color .18s;}
.inp:focus{outline:none;border-color:var(--teal);box-shadow:0 0 0 3px rgba(26,122,110,.12);}
.inp::placeholder{color:#aab8b5;}

/* icon button */
.ibtn{position:relative;width:40px;height:40px;border-radius:10px;border:1.5px solid var(--sand);background:#fff;display:flex;align-items:center;justify-content:center;font-size:1.15rem;cursor:pointer;color:var(--ink-soft);transition:all .18s;}
.ibtn:hover{border-color:var(--teal);color:var(--teal);}
.cnt{position:absolute;top:-5px;inset-inline-end:-5px;min-width:17px;height:17px;border-radius:9px;background:var(--teal);color:#fff;font-size:.65rem;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 3px;}

/* fav btn */
.fvb{position:absolute;top:9px;inset-inline-end:9px;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.93);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.05rem;color:var(--muted);transition:all .18s;box-shadow:0 3px 8px -5px rgba(0,0,0,.35);}
.fvb:hover{transform:scale(1.1);}
.fvb.on{color:#e53e3e;}

/* hero slider */
.hero{position:relative;width:100%;height:clamp(360px,56vw,680px);overflow:hidden;}
.hslide{position:absolute;inset:0;transition:opacity .7s ease;background:#111;}
.hslide img{width:100%;height:100%;object-fit:cover;opacity:.75;}
.hovl{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.75) 0%,rgba(0,0,0,.15) 60%,transparent 100%);}
.htxt{position:absolute;bottom:0;inset-inline:0;padding:clamp(24px,5vw,56px) clamp(20px,5vw,80px) clamp(28px,5vw,60px);color:#fff;}
.hbadge{display:inline-flex;align-items:center;background:rgba(26,122,110,.9);color:#fff;font-size:.82rem;font-weight:700;padding:.35rem 1rem;border-radius:999px;margin-bottom:14px;backdrop-filter:blur(4px);}
.htitle{font-size:clamp(2rem,5.5vw,3.6rem);font-weight:900;line-height:1.12;margin:0 0 10px;text-shadow:0 2px 16px rgba(0,0,0,.4);}
.hsub{font-size:clamp(.95rem,2vw,1.2rem);margin:0 0 22px;opacity:.9;max-width:600px;}
.harr{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.18);backdrop-filter:blur(6px);border:1.5px solid rgba(255,255,255,.35);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.3rem;cursor:pointer;transition:background .2s;z-index:5;}
.harr:hover{background:rgba(255,255,255,.32);}
.hdots{position:absolute;bottom:16px;inset-inline-start:50%;transform:translateX(50%);display:flex;gap:7px;z-index:5;}
.hdot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.45);border:none;cursor:pointer;transition:all .25s;padding:0;}
.hdot.on{background:#fff;width:22px;border-radius:4px;}

/* sub-nav strip */
.subnav{background:var(--bg);border-bottom:1px solid var(--sand);overflow-x:auto;scrollbar-width:none;}
.subnav::-webkit-scrollbar{display:none;}
.subnav-inner{display:flex;align-items:center;gap:6px;padding:10px 20px;white-space:nowrap;max-width:1200px;margin:0 auto;}
.snbtn{background:#fff;border:1.5px solid var(--sand);border-radius:999px;padding:.38rem .9rem;font-size:.82rem;font-weight:600;color:var(--ink-soft);cursor:pointer;font-family:inherit;transition:all .18s;white-space:nowrap;}
.snbtn:hover{border-color:var(--teal);color:var(--teal);}
.snbtn.active{background:var(--teal);border-color:var(--teal);color:#fff;}
.snbtn.allprod{background:var(--teal);color:#fff;border-color:var(--teal);}

/* header */
.hdr{position:sticky;top:0;z-index:60;transition:all .25s;}
.navlnk{font-size:.9rem;font-weight:600;color:var(--ink-soft);background:none;border:none;cursor:pointer;font-family:inherit;padding:.25rem 0;position:relative;white-space:nowrap;}
.navlnk::after{content:"";position:absolute;bottom:-2px;inset-inline-start:0;width:0;height:2px;background:var(--teal);transition:width .22s;}
.navlnk:hover{color:var(--teal);}
.navlnk:hover::after{width:100%;}

/* floating wa */
.fab{position:fixed;inset-inline-start:16px;bottom:80px;z-index:70;display:none;flex-direction:column;align-items:flex-start;gap:0;}
.fab-bubble{background:#fff;border:1px solid var(--sand);border-radius:12px 12px 12px 0;padding:8px 14px;font-size:.82rem;font-weight:700;color:var(--ink);box-shadow:0 6px 16px -8px rgba(0,0,0,.25);white-space:nowrap;margin-bottom:8px;}
.fab-btn{width:56px;height:56px;border-radius:50%;background:var(--wa);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.75rem;box-shadow:0 10px 26px -8px rgba(37,211,102,.75);text-decoration:none;animation:waP 2.5s infinite;}
@keyframes waP{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)}50%{box-shadow:0 0 0 12px rgba(37,211,102,0)}}

/* overlay / modal / drawer */
.ovl{position:fixed;inset:0;background:rgba(10,20,20,.55);backdrop-filter:blur(4px);z-index:90;display:flex;align-items:flex-end;justify-content:center;animation:fFade .25s;}
@media(min-width:768px){.ovl{align-items:center;padding:20px;}}
.mdl{background:var(--bg);width:100%;max-width:920px;max-height:94vh;overflow-y:auto;border-radius:20px 20px 0 0;animation:fUp .3s cubic-bezier(.2,.8,.2,1);}
@media(min-width:768px){.mdl{border-radius:20px;}}
.drw{position:fixed;top:0;inset-inline-start:0;height:100%;width:min(420px,92vw);background:var(--bg);z-index:95;box-shadow:0 0 60px rgba(0,0,0,.3);display:flex;flex-direction:column;animation:fSl .3s ease;}
@keyframes fFade{from{opacity:0}to{opacity:1}}
@keyframes fUp{from{transform:translateY(40px);opacity:.3}to{transform:none;opacity:1}}
@keyframes fSl{from{transform:translateX(-30px);opacity:.3}to{transform:none;opacity:1}}

/* reveal */
.rv{opacity:0;transform:translateY(20px);transition:opacity .65s,transform .65s;}
.rv.in{opacity:1;transform:none;}

/* bottom bar */
.btmbar{position:fixed;bottom:0;inset-inline:0;z-index:75;background:rgba(255,255,255,.97);backdrop-filter:blur(10px);border-top:1px solid var(--sand);display:flex;height:60px;}
.btmbar a,.btmbar button{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;background:none;border:none;cursor:pointer;color:var(--ink-soft);font-family:inherit;font-size:.63rem;font-weight:700;text-decoration:none;position:relative;}
.btmbar .lic{font-size:1.25rem;}
.btmbar .wac{color:var(--wa-d);}

/* color circle */
.clrc{width:62px;height:62px;border-radius:50%;box-shadow:0 6px 16px -10px rgba(0,0,0,.3),inset 0 0 0 1px rgba(255,255,255,.4);transition:transform .2s;}
.clrc:hover{transform:translateY(-4px) scale(1.04);}

/* payment badge */
.pay{padding:4px 9px;border-radius:7px;background:#f2f6f5;color:#444;font-size:.68rem;font-weight:800;letter-spacing:.02em;border:1px solid var(--sand);}

@media(min-width:900px){
  .dn-desk{display:none!important;}
  .df-desk{display:flex!important;}
  .btmbar{display:none!important;}
  .r{padding-bottom:0!important;}
  .fab{display:flex!important;}
  .mdl-grid{grid-template-columns:1fr 1fr!important;}
}
@media(prefers-reduced-motion:reduce){.r *,.rv{transition:none!important;animation:none!important;}.rv{opacity:1;transform:none;}}
`;

/* ─── Hero Slider ─────────────────────────────────────────────────────── */
function HeroSlider({ lang, onCatalog }){
  const L = T[lang];
  const [cur, setCur] = useState(0);
  const timerRef = useRef(null);

  const go = useCallback(dir => {
    setCur(c => (c + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 5000);
    return () => clearInterval(timerRef.current);
  }, [go]);

  const goTo = i => { clearInterval(timerRef.current); setCur(i); timerRef.current = setInterval(() => go(1), 5000); };

  return (
    <div className="hero" id="r-home">
      {HERO_SLIDES.map((s, i) => (
        <div key={i} className="hslide" style={{ opacity: i === cur ? 1 : 0, zIndex: i === cur ? 2 : 1 }}>
          <img src={s.image} alt="" />
          <div className="hovl" />
        </div>
      ))}

      {/* text */}
      <div className="htxt" style={{ zIndex: 3 }}>
        <div className="hbadge">{HERO_SLIDES[cur].badge[lang]}</div>
        <h1 className="htitle disp">{HERO_SLIDES[cur].title[lang]}</h1>
        <p className="hsub">{HERO_SLIDES[cur].sub[lang]}</p>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button className="btn btn-teal" style={{ background:"rgba(255,255,255,.95)", color:"var(--teal)", borderRadius:999 }} onClick={onCatalog}>
            {L.heroBtn1} <Ic.chevL style={{ transform:"scaleX(-1)" }} />
          </button>
          <a className="btn btn-wa" href={waUrl(L.wa.intro)} target="_blank" rel="noreferrer">
            <Ic.wa /> {L.heroBtn2}
          </a>
        </div>

        {/* stats strip inside hero */}
        <div style={{ display:"flex", gap:18, marginTop:20, flexWrap:"wrap" }}>
          {[{ ico:"●", c:"var(--wa)", l: lang==="he"?"70% חיסכון במחיר":"توفير 70%"}, {ico:"●",c:"var(--wa)",l:lang==="he"?"מאות ביקורות חיוביות":"مئات التقييمات الإيجابية"},{ico:"●",c:"#F6A623",l:lang==="he"?"אחריות מלאה":"كفالة كاملة"}].map((s,i)=>(
            <span key={i} style={{color:"#fff",fontSize:".85rem",fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
              <span style={{color:s.c,fontSize:"1.1rem"}}>●</span> {s.l}
            </span>
          ))}
        </div>
      </div>

      {/* arrows */}
      <button className="harr" style={{ insetInlineStart:14 }} onClick={() => goTo((cur-1+HERO_SLIDES.length)%HERO_SLIDES.length)} aria-label="prev"><Ic.chevL /></button>
      <button className="harr" style={{ insetInlineEnd:14 }} onClick={() => goTo((cur+1)%HERO_SLIDES.length)} aria-label="next"><Ic.chevR /></button>

      {/* dots */}
      <div className="hdots">
        {HERO_SLIDES.map((_,i) => <button key={i} className={`hdot ${i===cur?"on":""}`} onClick={()=>goTo(i)} aria-label={`slide ${i+1}`} />)}
      </div>
    </div>
  );
}

/* ─── Header ──────────────────────────────────────────────────────────── */
function Header({ lang, setLang, onNav, scrolled, favCnt, cartCnt, onCart }){
  const L = T[lang];
  const [open, setOpen] = useState(false);
  const go = k => { onNav(k); setOpen(false); };
  const navKeys = ["home","catalog","colors","gallery","reviews","about","contact"];
  return (
    <>
      {/* promo strip */}
      <div style={{ background:"var(--teal)",color:"#fff",textAlign:"center",fontSize:".78rem",fontWeight:700,padding:"6px 12px",letterSpacing:".02em" }}>{L.promo}</div>

      <header className="hdr" style={{ background: scrolled?"rgba(255,255,255,.96)":"rgba(255,255,255,.90)", backdropFilter:"blur(10px)", borderBottom:`1px solid ${scrolled?"var(--sand)":"transparent"}`, boxShadow:scrolled?"0 4px 16px -12px rgba(26,122,110,.4)":"none" }}>
        <div className="sec" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:62 }}>

          {/* logo */}
          <button onClick={()=>go("home")} style={{ display:"flex",alignItems:"center",gap:9,background:"none",border:"none",cursor:"pointer",flexShrink:0 }}>
            <span style={{ width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,var(--teal),var(--teal-d))",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.25rem" }}><Ic.sofa/></span>
            <span className="disp" style={{ fontSize:"1.25rem",fontWeight:700,color:"var(--teal-d)" }}>{L.brand}</span>
          </button>

          {/* desktop nav */}
          <nav className="df-desk" style={{ display:"none",alignItems:"center",gap:16 }}>
            {navKeys.map(k=>(
              k==="colors"
                ? <button key={k} className="navlnk" onClick={()=>go(k)} style={{ display:"flex",alignItems:"center",gap:4,border:"1.5px solid var(--teal-m)",borderRadius:999,padding:".3rem .8rem",color:"var(--teal-d)" }}><Ic.palette style={{fontSize:".95rem"}}/>{L.nav[k]}</button>
                : k==="gallery"
                ? <button key={k} className="navlnk" onClick={()=>go(k)} style={{ display:"flex",alignItems:"center",gap:4,border:"1.5px solid var(--sand2)",borderRadius:999,padding:".3rem .8rem" }}><span>📷</span>{L.nav[k]}</button>
                : k==="reviews"
                ? <button key={k} className="navlnk" onClick={()=>go(k)} style={{ display:"flex",alignItems:"center",gap:4,border:"1.5px solid var(--sand2)",borderRadius:999,padding:".3rem .8rem" }}><Ic.star style={{fontSize:".9rem",color:"var(--star)"}}/>{L.nav[k]}</button>
                : <button key={k} className="navlnk" onClick={()=>go(k)}>{L.nav[k]}</button>
            ))}
          </nav>

          {/* right actions */}
          <div style={{ display:"flex",alignItems:"center",gap:7 }}>
            {/* Google rating */}
            <div className="df-desk" style={{ display:"none",alignItems:"center",gap:5,fontSize:".8rem",fontWeight:700,color:"var(--ink-soft)" }}>
              <Stars n={5} size=".75rem"/> <span style={{color:"var(--star)"}}>4.9</span> <span style={{color:"var(--muted)"}}>(+178)</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={()=>setLang(lang==="he"?"ar":"he")} style={{gap:5}}><Ic.globe/>{L.switchTo}</button>
            <div className="df-desk" style={{ display:"none",gap:7 }}>
              <button className="ibtn" onClick={()=>go("fav")} aria-label={L.bottom.fav}><Ic.heart/>{favCnt>0&&<span className="cnt">{favCnt}</span>}</button>
              <button className="ibtn" onClick={onCart} aria-label={L.cart.title}><Ic.cart/>{cartCnt>0&&<span className="cnt">{cartCnt}</span>}</button>
            </div>
            <a className="btn btn-wa btn-sm df-desk" href={waUrl(L.wa.intro)} target="_blank" rel="noreferrer" style={{display:"none"}}><Ic.wa/>{L.waBtn}</a>
            <button className="ibtn dn-desk" onClick={()=>setOpen(!open)} aria-label="menu">{open?<Ic.close/>:<Ic.menu/>}</button>
          </div>
        </div>

        {/* mobile menu */}
        {open && (
          <div style={{ borderTop:"1px solid var(--sand)",background:"rgba(255,255,255,.99)" }}>
            <div className="sec" style={{ padding:"12px 20px 18px",display:"flex",flexDirection:"column",gap:2 }}>
              {navKeys.map(k=>(<button key={k} className="navlnk" onClick={()=>go(k)} style={{ textAlign:"start",padding:"10px 4px",borderBottom:"1px solid var(--sand)",fontSize:".98rem" }}>{L.nav[k]}</button>))}
              <a className="btn btn-wa btn-block" href={waUrl(L.wa.intro)} target="_blank" rel="noreferrer" style={{marginTop:12}}><Ic.wa/>{L.waBtn}</a>
            </div>
          </div>
        )}
      </header>

      {/* sub-nav strip */}
      <div className="subnav">
        <div className="subnav-inner">
          <button className="snbtn allprod" onClick={()=>onNav("catalog")}>{lang==="he"?"כל המוצרים ←":"كل المنتجات ←"}</button>
          {(lang==="he" ? SUB_CATS_HE : SUB_CATS_AR).map((c,i)=>(<button key={i} className="snbtn">{c}</button>))}
        </div>
      </div>
    </>
  );
}

/* ─── Value Section (stats + text) ───────────────────────────────────── */
function ValueSection({ lang }){
  const L = T[lang];
  return (
    <section style={{ padding:"36px 0" }}>
      <div className="sec">
        <div className="rv" style={{ display:"grid", gap:20 }} id="val-grid">
          {/* stats box */}
          <div style={{ background:"var(--bg-alt)", border:"1px solid var(--sand)", borderRadius:18, padding:"24px 20px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0, marginBottom:20, borderBottom:"1px solid var(--sand)", paddingBottom:18 }}>
              {L.statsRow.map((s,i)=>(
                <div key={i} style={{ textAlign:"center", borderInlineStart:i?"1px solid var(--sand)":"none" }}>
                  <div className="disp" style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)", fontWeight:900, color:"var(--teal)" }}>{s.num}</div>
                  <div style={{ fontSize:".72rem", color:"var(--muted)", fontWeight:700 }}>{s.label}</div>
                </div>
              ))}
            </div>
            {L.valueChecks.map((c,i)=>(<div key={i} style={{ display:"flex",alignItems:"center",gap:8,padding:"5px 0",fontSize:".9rem",fontWeight:600,color:"var(--ink-soft)" }}><span style={{ color:"var(--teal)",display:"flex" }}><Ic.check/></span>{c}</div>))}
          </div>
          {/* text box */}
          <div style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <div style={{ fontSize:".75rem", fontWeight:700, color:"var(--teal)", letterSpacing:".12em", marginBottom:8, textTransform:"uppercase" }}>
              {lang==="he"?"חיסכון של עד 70% במחיר":"توفير حتى 70% بالسعر"}
            </div>
            <h2 className="disp" style={{ fontSize:"clamp(1.5rem,4vw,2.3rem)", marginBottom:14 }}>{L.valueTitle}</h2>
            <p style={{ color:"var(--ink-soft)", lineHeight:1.7, marginBottom:20 }}>{L.valueText}</p>
            <a className="btn btn-wa" style={{ alignSelf:"flex-start" }} href={waUrl(L.valueCta)} target="_blank" rel="noreferrer"><Ic.wa/>{L.valueCta}</a>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){#val-grid{grid-template-columns:.9fr 1.1fr!important;}}`}</style>
    </section>
  );
}

/* ─── Product Card ────────────────────────────────────────────────────── */
function PCard({ p, lang, onOpen, isFav, onFav }){
  const L = T[lang];
  const price = p.isCustomSize ? `${L.from} ${fmt(p.basePrice)}` : fmt(p.basePrice);
  return (
    <div className="card rv" style={{ display:"flex",flexDirection:"column" }}>
      <div style={{ position:"relative" }}>
        <Img src={p.image} alt={p.name[lang]} style={{ width:"100%",height:220,objectFit:"cover",cursor:"pointer" }}/>
        <span className={`bdg ${p.availability}`} style={{ insetInlineStart:10 }}>{L.badges[p.availability]}</span>
        {p.isCustomSize && <span className="bdg" style={{ insetInlineEnd:10,background:"rgba(26,122,110,.9)",color:"#fff",top:10 }}><Ic.ruler/>{lang==="he"?"מידה אישית":"مقاس حسب الطلب"}</span>}
        <button className={`fvb ${isFav?"on":""}`} onClick={()=>onFav(p.id)}>{isFav?<Ic.heartF/>:<Ic.heart/>}</button>
      </div>
      <div style={{ padding:"16px 16px 18px",display:"flex",flexDirection:"column",flex:1 }}>
        <span style={{ fontSize:".72rem",color:"var(--teal)",fontWeight:700,letterSpacing:".04em" }}>{L.cats[p.category]}</span>
        <h3 className="disp" style={{ fontSize:"1.2rem",margin:"4px 0 8px" }}>{p.name[lang]}</h3>
        <div style={{ marginTop:"auto" }}>
          <div style={{ display:"flex",alignItems:"baseline",gap:8,marginBottom:12 }}>
            <span style={{ fontSize:"1.3rem",fontWeight:800,color:"var(--teal-d)" }}>{price}</span>
            {p.oldPrice && !p.isCustomSize && <span style={{ fontSize:".85rem",color:"var(--muted)",textDecoration:"line-through" }}>{L.was} {fmt(p.oldPrice)}</span>}
          </div>
          <div style={{ display:"flex",gap:7 }}>
            <button className="btn btn-teal btn-sm" style={{ flex:1 }} onClick={()=>onOpen(p)}>{L.choose}</button>
            <a className="btn btn-wa btn-sm" href={waUrl(quickMsg(p,lang))} target="_blank" rel="noreferrer" aria-label={L.quickWa}><Ic.wa/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Catalog Section ─────────────────────────────────────────────────── */
function CatalogSec({ lang, filter, setFilter, onOpen, favs, onFav }){
  const L = T[lang];
  const cats = ["all","chairs","beds","salons","fav"];
  const list = filter==="all" ? products : filter==="fav" ? products.filter(p=>favs.includes(p.id)) : products.filter(p=>p.category===filter);
  return (
    <section id="r-catalog" style={{ padding:"24px 0 50px" }}>
      <div className="sec">
        <div className="rv" style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:22 }}>
          <div>
            <span style={{ fontSize:".72rem",fontWeight:700,color:"var(--teal)",letterSpacing:".1em",textTransform:"uppercase" }}>{L.popularTitle}</span>
            <h2 className="disp" style={{ fontSize:"clamp(1.6rem,4vw,2.3rem)",margin:"4px 0 4px" }}>{L.popularTitle}</h2>
            <p style={{ color:"var(--muted)",fontSize:".9rem" }}>{L.popularSub}</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={()=>setFilter("all")}>{L.allProducts}</button>
        </div>
        <div style={{ display:"flex",gap:7,flexWrap:"wrap",marginBottom:26 }}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setFilter(c)} className="btn btn-sm" style={{ background:filter===c?"var(--teal)":"#fff",color:filter===c?"#fff":"var(--ink-soft)",border:filter===c?"none":"1.5px solid var(--sand)",display:"inline-flex",gap:5 }}>
              {c==="fav"&&<Ic.heart/>}{L.filters[c]}
            </button>
          ))}
        </div>
        {list.length===0
          ? <div className="card" style={{ textAlign:"center",padding:"44px 20px",color:"var(--muted)" }}><div style={{ fontSize:"2.2rem",marginBottom:8 }}>{filter==="fav"?<Ic.heart/>:<Ic.sofa/>}</div>{filter==="fav"?L.emptyFav:L.empty}</div>
          : <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20 }}>
              {list.map(p=><PCard key={p.id} p={p} lang={lang} onOpen={onOpen} isFav={favs.includes(p.id)} onFav={onFav}/>)}
            </div>
        }
      </div>
    </section>
  );
}

/* ─── Row helper ──────────────────────────────────────────────────────── */
function Row({ label, value, strong }){
  return <div style={{ display:"flex",justifyContent:"space-between",padding:"3px 0",color:strong?"var(--ink)":"var(--ink-soft)",fontWeight:strong?700:400 }}><span>{label}</span><span>{value}</span></div>;
}

/* ─── Product Modal ───────────────────────────────────────────────────── */
function PModal({ p, lang, onClose, onAddCart }){
  const L = T[lang];
  const [meters,  setMeters]   = useState(p.baseMeters||0);
  const [color,   setColor]    = useState(p.colors[0]);
  const [delivery,setDelivery] = useState(false);
  const [install, setInstall]  = useState(false);
  const [activeImg,setActiveImg] = useState(p.image);
  const [added,   setAdded]    = useState(false);

  useEffect(()=>{ document.body.style.overflow="hidden"; return()=>{ document.body.style.overflow=""; }; },[]);
  useEffect(()=>{ const k=e=>e.key==="Escape"&&onClose(); window.addEventListener("keydown",k); return()=>window.removeEventListener("keydown",k); },[onClose]);

  const { extra, extraP, delP, instP, total } = calcOrder(p,{ meters,color,delivery,installation:install });
  const cfg = { meters,color,delivery,installation:install };
  const mOpts = p.isCustomSize ? Array.from({length:10-p.baseMeters+1},(_,i)=>p.baseMeters+i) : [];
  const gallery = [p.image,...(p.gallery||[])].filter((v,i,a)=>a.indexOf(v)===i);

  const addCart = () => {
    onAddCart({ uid:Date.now()+"-"+Math.random(), productId:p.id, name:p.name, category:p.category, meters:p.isCustomSize?meters:null, color, delivery, installation:install, total });
    setAdded(true); setTimeout(()=>setAdded(false),1600);
  };

  return (
    <div className="ovl" onClick={onClose}>
      <div className="mdl" onClick={e=>e.stopPropagation()}>
        <div style={{ position:"sticky",top:0,zIndex:5,background:"var(--bg)",borderBottom:"1px solid var(--sand)",padding:"13px 18px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div><span style={{ fontSize:".72rem",color:"var(--teal)",fontWeight:700 }}>{L.cats[p.category]}</span><h3 className="disp" style={{ fontSize:"1.25rem",margin:0 }}>{p.name[lang]}</h3></div>
          <button onClick={onClose} className="ibtn"><Ic.close/></button>
        </div>
        <div className="mdl-grid" style={{ display:"grid",gridTemplateColumns:"1fr" }}>
          {/* gallery */}
          <div style={{ padding:18 }}>
            <Img src={activeImg} alt={p.name[lang]} style={{ width:"100%",height:270,objectFit:"cover",borderRadius:14,border:"1px solid var(--sand)" }}/>
            <div style={{ display:"flex",gap:7,marginTop:9,flexWrap:"wrap" }}>
              {gallery.map((g,i)=>(<button key={i} onClick={()=>setActiveImg(g)} style={{ padding:0,border:activeImg===g?"2px solid var(--teal)":"2px solid transparent",borderRadius:9,overflow:"hidden",cursor:"pointer",background:"none" }}><Img src={g} alt="" style={{ width:58,height:58,objectFit:"cover",borderRadius:7 }}/></button>))}
            </div>
            <p style={{ color:"var(--ink-soft)",fontSize:".93rem",marginTop:14 }}>{p.desc[lang]}</p>
          </div>
          {/* config */}
          <div style={{ padding:18,background:"var(--bg-alt)",borderInlineStart:"1px solid var(--sand)" }}>
            {p.isCustomSize && (
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"flex",alignItems:"center",gap:6,fontWeight:700,marginBottom:9 }}><Ic.ruler style={{ color:"var(--teal)" }}/>{L.calc.pick}</label>
                <div className="tape">{mOpts.map(m=>(<div key={m} className={`mtr ${meters===m?"on":""}`} onClick={()=>setMeters(m)}><div className="num">{m}</div><div className="unt">{L.calc.meter}</div><div className="tks"><span/><span/><span/><span/><span/></div></div>))}</div>
                <div style={{ marginTop:12,background:"#fff",borderRadius:10,padding:"11px 13px",fontSize:".87rem",border:"1px solid var(--sand)" }}>
                  <Row label={L.calc.baseSize} value={`${p.baseMeters} ${L.calc.meter}`}/>
                  <Row label={L.calc.basePrice} value={fmt(p.basePrice)}/>
                  <Row label={L.calc.extra} value={`${extra} ${L.calc.meter}`}/>
                  <Row label={L.calc.extraPrice} value={fmt(extraP)}/>
                  <div style={{ borderTop:"1px dashed var(--sand2)",margin:"7px 0" }}/>
                  <Row label={L.calc.total} value={fmt(p.basePrice+extraP)} strong/>
                </div>
              </div>
            )}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"flex",alignItems:"center",gap:6,fontWeight:700,marginBottom:9 }}><Ic.palette style={{ color:"var(--teal)" }}/>{L.modal.color}</label>
              <div style={{ display:"flex",gap:9,flexWrap:"wrap",alignItems:"center" }}>
                {p.colors.map(c=>(<button key={c} onClick={()=>setColor(c)} className={`sw ${color===c?"on":""}`} style={{ background:COLOR_SWATCHES[c] }} title={L.colorNames[c]} aria-label={L.colorNames[c]}/>))}
                <span style={{ marginInlineStart:4,color:"var(--ink-soft)",fontSize:".88rem" }}>{L.colorNames[color]}</span>
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={{ display:"flex",alignItems:"center",gap:6,fontWeight:700,marginBottom:9 }}><Ic.truck style={{ color:"var(--teal)" }}/>{L.modal.options}</label>
              <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
                <div className={`opt ${delivery?"on":""}`} onClick={()=>setDelivery(!delivery)}><span className="chk">{delivery&&<Ic.check/>}</span><span style={{ flex:1 }}>{L.opts.delivery}</span><span style={{ fontWeight:700,color:"var(--teal-d)" }}>{fmt(p.deliveryPrice)}</span></div>
                {p.supportsInstallation && <div className={`opt ${install?"on":""}`} onClick={()=>setInstall(!install)}><span className="chk">{install&&<Ic.check/>}</span><span style={{ flex:1 }}>{L.opts.install}</span><span style={{ fontWeight:700,color:"var(--teal-d)" }}>{fmt(INSTALLATION_PRICE)}</span></div>}
              </div>
            </div>
            <div style={{ background:"#fff",border:"1px solid var(--sand)",borderRadius:12,padding:14 }}>
              <div style={{ fontWeight:700,marginBottom:9,display:"flex",alignItems:"center",gap:6 }}><Ic.tag style={{ color:"var(--teal)" }}/>{L.modal.summary}</div>
              <Row label={L.sumLabels.base} value={fmt(p.basePrice)}/>
              {p.isCustomSize && extraP>0 && <Row label={L.sumLabels.extra} value={fmt(extraP)}/>}
              {delivery && <Row label={L.sumLabels.del} value={fmt(delP)}/>}
              {install  && <Row label={L.sumLabels.inst} value={fmt(instP)}/>}
              <div style={{ borderTop:"1px solid var(--sand2)",margin:"9px 0 7px" }}/>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline" }}><span style={{ fontWeight:700 }}>{L.sumLabels.total}</span><span className="disp" style={{ fontSize:"1.55rem",fontWeight:900,color:"var(--teal-d)" }}>{fmt(total)}</span></div>
            </div>
            <div style={{ display:"flex",gap:7,marginTop:12 }}>
              <button className="btn btn-outline" style={{ flex:1 }} onClick={addCart}><Ic.cart/>{added?<Ic.check/>:L.modal.addCart}</button>
              <a className="btn btn-wa" style={{ flex:1.4 }} href={waUrl(buildMsg(p,cfg,lang))} target="_blank" rel="noreferrer"><Ic.wa/>{L.modal.order}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Cart Drawer ─────────────────────────────────────────────────────── */
function CartDrawer({ lang, cart, onClose, onRemove }){
  const L = T[lang];
  const grand = cart.reduce((s,it)=>s+it.total,0);
  useEffect(()=>{ document.body.style.overflow="hidden"; return()=>{ document.body.style.overflow=""; }; },[]);
  return (
    <div className="ovl" style={{ justifyContent:"flex-start",alignItems:"stretch",padding:0 }} onClick={onClose}>
      <div className="drw" onClick={e=>e.stopPropagation()}>
        <div style={{ padding:"15px 17px",borderBottom:"1px solid var(--sand)",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <h3 className="disp" style={{ fontSize:"1.2rem",margin:0,display:"flex",alignItems:"center",gap:8 }}><Ic.cart/>{L.cart.title}</h3>
          <button className="ibtn" onClick={onClose}><Ic.close/></button>
        </div>
        <div style={{ flex:1,overflowY:"auto",padding:15 }}>
          {cart.length===0
            ? <div style={{ textAlign:"center",color:"var(--muted)",padding:"55px 16px" }}><div style={{ fontSize:"2.4rem",marginBottom:9 }}><Ic.cart/></div>{L.cart.empty}</div>
            : cart.map(it=>(
              <div key={it.uid} style={{ display:"flex",gap:9,padding:"11px 0",borderBottom:"1px solid var(--sand)" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700 }}>{it.name[lang]}</div>
                  <div style={{ fontSize:".78rem",color:"var(--muted)" }}>{T[lang].colorNames[it.color]}{it.meters?` · ${it.meters}${T[lang].wa.m}`:""}</div>
                  <button onClick={()=>onRemove(it.uid)} style={{ background:"none",border:"none",color:"var(--red)",fontSize:".76rem",cursor:"pointer",padding:"3px 0",fontFamily:"inherit" }}>{L.cart.remove}</button>
                </div>
                <div style={{ fontWeight:800,color:"var(--teal-d)" }}>{fmt(it.total)}</div>
              </div>
            ))
          }
        </div>
        {cart.length>0 && (
          <div style={{ borderTop:"1px solid var(--sand)",padding:15,background:"var(--surface)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:11 }}><span style={{ fontWeight:700 }}>{L.cart.total} ({cart.length} {L.cart.items})</span><span className="disp" style={{ fontSize:"1.4rem",fontWeight:900,color:"var(--teal-d)" }}>{fmt(grand)}</span></div>
            <a className="btn btn-wa btn-block" href={waUrl(cartMsg(cart,lang))} target="_blank" rel="noreferrer"><Ic.wa/>{L.cart.checkout}</a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Colors Section ──────────────────────────────────────────────────── */
function ColorsSec({ lang }){
  const L = T[lang];
  const order = ["beige","gray","darkgray","brown","black","cream"];
  return (
    <section id="r-colors" style={{ padding:"50px 0",background:"var(--bg-alt)" }}>
      <div className="sec">
        <div className="rv" style={{ textAlign:"center",marginBottom:32 }}>
          <span style={{ fontSize:".73rem",fontWeight:700,color:"var(--teal)",letterSpacing:".1em",textTransform:"uppercase" }}>{lang==="he"?"0+ צבעים":"0+ لون"}</span>
          <h2 className="disp" style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)",margin:"8px 0 8px" }}>{L.colorsTitle}</h2>
          <p style={{ color:"var(--muted)",maxWidth:560,margin:"0 auto" }}>{L.colorsSub}</p>
        </div>
        <div className="rv" style={{ display:"flex",justifyContent:"center",flexWrap:"wrap",gap:26 }}>
          {order.map(c=>(<div key={c} style={{ textAlign:"center" }}><div className="clrc" style={{ background:COLOR_SWATCHES[c] }}/><div style={{ marginTop:9,fontSize:".88rem",color:"var(--ink-soft)",fontWeight:600 }}>{L.colorNames[c]}</div></div>))}
        </div>
        <div className="rv" style={{ textAlign:"center",marginTop:26 }}>
          <a className="btn btn-teal" href={waUrl(T[lang].wa.intro)} target="_blank" rel="noreferrer"><Ic.wa/>{lang==="he"?"גלו את כל הצבעים":"اكتشف كل الألوان"}</a>
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews ─────────────────────────────────────────────────────────── */
function ReviewsSec({ lang }){
  const L = T[lang];
  return (
    <section id="r-reviews" style={{ padding:"50px 0" }}>
      <div className="sec">
        <div className="rv" style={{ textAlign:"center",marginBottom:28 }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:8 }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/120px-Google_2015_logo.svg.png" alt="Google" style={{ height:18,filter:"grayscale(.3)" }}/>
          </div>
          <h2 className="disp" style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)",margin:"6px 0 6px" }}>{L.revTitle}</h2>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:7 }}><Stars n={5} size="1.1rem"/><span style={{ fontWeight:800,fontSize:"1.05rem" }}>4.9</span><span style={{ color:"var(--muted)",fontSize:".85rem" }}>({lang==="he"?"+178 ביקורות":"+178 تقييم"})</span></div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16 }}>
          {REVIEWS.map((r,i)=>(
            <div key={i} className="card rv" style={{ padding:"18px 20px",background:"#fff" }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                <span style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,var(--teal),var(--teal-d))",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700 }}>{r.name[lang][0]}</span>
                <div><div style={{ fontWeight:700,fontSize:".88rem" }}>{r.name[lang]}</div><div style={{ fontSize:".72rem",color:"var(--muted)" }}>{r.date}</div></div>
                <span style={{ marginInlineStart:"auto" }}><Stars n={r.stars} size=".85rem"/></span>
              </div>
              <p style={{ margin:0,color:"var(--ink-soft)",fontSize:".9rem",lineHeight:1.65 }}>"{r.text[lang]}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery ─────────────────────────────────────────────────────────── */
function GallerySec({ lang }){
  const L = T[lang];
  return (
    <section id="r-gallery" style={{ padding:"50px 0",background:"var(--bg-alt)" }}>
      <div className="sec">
        <div className="rv" style={{ textAlign:"center",marginBottom:28 }}>
          <h2 className="disp" style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)",margin:"6px 0 6px" }}>{L.galleryTitle}</h2>
          <p style={{ color:"var(--muted)" }}>{L.gallerySub}</p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:10 }}>
          {GALLERY_IMAGES.map((src,i)=>(<Img key={i} src={src} alt="" className="rv" style={{ width:"100%",height:155,objectFit:"cover",borderRadius:12,border:"1px solid var(--sand)" }}/>))}
        </div>
      </div>
    </section>
  );
}

/* ─── Trust ───────────────────────────────────────────────────────────── */
function TrustSec({ lang }){
  const L = T[lang];
  const icons=[Ic.ruler,Ic.truck,Ic.tag,Ic.wa,Ic.tag,Ic.palette];
  return (
    <section style={{ padding:"46px 0",background:"var(--teal)",color:"#fff" }}>
      <div className="sec">
        <h2 className="disp rv" style={{ textAlign:"center",color:"#fff",fontSize:"clamp(1.5rem,4vw,2.2rem)",marginBottom:28 }}>{L.trustTitle}</h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12 }}>
          {L.trust.map((tx,i)=>{ const I=icons[i]||Ic.check; return(
            <div key={i} className="rv" style={{ display:"flex",alignItems:"center",gap:12,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:12,padding:"14px 16px" }}>
              <span style={{ width:40,height:40,borderRadius:10,background:"rgba(255,255,255,.2)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0 }}><I/></span>
              <span style={{ fontWeight:600,fontSize:".95rem" }}>{tx}</span>
            </div>); })}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────────────────── */
function ContactSec({ lang }){
  const L = T[lang];
  const [form,setForm]=useState({name:"",phone:"",product:"",msg:""});
  const set=k=>e=>setForm({...form,[k]:e.target.value});
  const submit=()=>{
    const w=L.wa;
    window.open(waUrl([w.cIntro,"",`${w.cName}: ${form.name}`,`${w.cPhone}: ${form.phone}`,`${w.cProd}: ${form.product}`,`${w.cMsg}: ${form.msg}`].join("\n")),"_blank");
  };
  return (
    <section id="r-contact" style={{ padding:"52px 0" }}>
      <div className="sec">
        <div className="rv" style={{ textAlign:"center",marginBottom:28 }}>
          <h2 className="disp" style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)",margin:"6px 0 6px" }}>{L.contactTitle}</h2>
          <p style={{ color:"var(--muted)" }}>{L.contactSub}</p>
        </div>
        <div id="ctc-grid" style={{ display:"grid",gridTemplateColumns:"1fr",gap:20 }}>
          {/* info cards */}
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            {[
              { icon:<Ic.phone/>, title:lang==="he"?"טלפון":"هاتف", val:STORE_INFO.phoneDisplay, href:`tel:${STORE_INFO.phoneDisplay}` },
              { icon:<Ic.wa/>,    title:"WhatsApp",                  val:lang==="he"?"מענה מהיר 24/7":"رد سريع 24/7", href:waUrl(L.wa.intro), wa:true },
              { icon:<Ic.pin/>,   title:lang==="he"?"כתובת":"العنوان", val:STORE_INFO.address[lang], href:null },
              { icon:<Ic.clock/>, title:lang==="he"?"שעות פעילות":"ساعات العمل", val:`${STORE_INFO.hoursWeek[lang]} · ${STORE_INFO.hoursFri[lang]}`, href:null },
            ].map((c,i)=>(
              <a key={i} href={c.href||"#"} target={c.href?"_blank":undefined} rel="noreferrer" className="card" style={{ padding:"14px 16px",display:"flex",alignItems:"center",gap:12,textDecoration:"none",color:"inherit" }}>
                <span style={{ color:c.wa?"var(--wa-d)":"var(--teal)",fontSize:"1.3rem" }}>{c.icon}</span>
                <div><div style={{ fontWeight:700 }}>{c.title}</div><div style={{ color:"var(--muted)",fontSize:".88rem" }}>{c.val}</div></div>
              </a>
            ))}
          </div>
          {/* form */}
          <div className="card rv" style={{ background:"#fff",padding:"22px 20px" }}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              <Fld label={L.contactLabels.name}><input className="inp" value={form.name} onChange={set("name")} placeholder={L.contactPH.name}/></Fld>
              <Fld label={L.contactLabels.phone}><input className="inp" value={form.phone} onChange={set("phone")} placeholder={L.contactPH.phone} inputMode="tel"/></Fld>
            </div>
            <div style={{ marginTop:12 }}><Fld label={L.contactLabels.product}><input className="inp" value={form.product} onChange={set("product")} placeholder={L.contactPH.product}/></Fld></div>
            <div style={{ marginTop:12 }}><Fld label={L.contactLabels.msg}><textarea className="inp" value={form.msg} onChange={set("msg")} placeholder={L.contactPH.msg} rows={4} style={{ resize:"vertical" }}/></Fld></div>
            <button className="btn btn-wa btn-block" onClick={submit} style={{ marginTop:16,padding:"1rem" }}><Ic.wa/>{L.contactLabels.submit}</button>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){#ctc-grid{grid-template-columns:.85fr 1.15fr!important;}}`}</style>
    </section>
  );
}
function Fld({ label, children }){
  return <label style={{ display:"block" }}><span style={{ display:"block",fontSize:".83rem",fontWeight:700,color:"var(--ink-soft)",marginBottom:5 }}>{label}</span>{children}</label>;
}

/* ─── Footer ──────────────────────────────────────────────────────────── */
function FooterSec({ lang, onNav }){
  const L = T[lang];
  return (
    <footer style={{ background:"var(--ink)",color:"#cdc2b2",padding:"44px 0 26px" }}>
      <div className="sec">
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:28,marginBottom:26 }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:13 }}>
              <span style={{ width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,var(--teal),var(--teal-d))",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem" }}><Ic.sofa/></span>
              <span className="disp" style={{ fontSize:"1.25rem",fontWeight:700,color:"#fff" }}>{L.brand}</span>
            </div>
            <p style={{ fontSize:".88rem",lineHeight:1.7,maxWidth:300 }}>{L.footer.about}</p>
            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:".74rem",color:"#8a9a97",marginBottom:7 }}>{L.footer.payments}</div>
              <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>{PAYMENTS.map(pm=>(<span key={pm} className="pay">{pm}</span>))}</div>
            </div>
          </div>
          <div>
            <h4 style={{ color:"#fff",marginBottom:12,fontWeight:700 }}>{L.footer.cats}</h4>
            {["chairs","beds","salons"].map(k=>(<button key={k} onClick={()=>onNav(k)} style={{ display:"block",background:"none",border:"none",color:"#cdc2b2",cursor:"pointer",padding:"4px 0",fontFamily:"inherit",fontSize:".88rem" }}>{L.cats[k]}</button>))}
          </div>
          <div>
            <h4 style={{ color:"#fff",marginBottom:12,fontWeight:700 }}>{L.footer.links}</h4>
            {["catalog","colors","gallery","reviews","contact"].map(k=>(<button key={k} onClick={()=>onNav(k)} style={{ display:"block",background:"none",border:"none",color:"#cdc2b2",cursor:"pointer",padding:"4px 0",fontFamily:"inherit",fontSize:".88rem" }}>{L.nav[k]}</button>))}
          </div>
          <div>
            <h4 style={{ color:"#fff",marginBottom:12,fontWeight:700 }}>{L.footer.contact}</h4>
            <a href={waUrl(L.wa.intro)} target="_blank" rel="noreferrer" style={{ display:"flex",alignItems:"center",gap:7,color:"#cdc2b2",textDecoration:"none",padding:"4px 0",fontSize:".88rem" }}><Ic.wa style={{ color:"var(--wa)" }}/>WhatsApp</a>
            <a href={`tel:${STORE_INFO.phoneDisplay}`} style={{ display:"flex",alignItems:"center",gap:7,color:"#cdc2b2",textDecoration:"none",padding:"4px 0",fontSize:".88rem",direction:"ltr",justifyContent:"flex-end" }}><Ic.phone style={{ color:"var(--teal-m)" }}/>{STORE_INFO.phoneDisplay}</a>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:16,textAlign:"center",fontSize:".78rem",color:"#7a8a87" }}>
          © {new Date().getFullYear()} {L.brand} — {L.footer.rights}.
        </div>
      </div>
    </footer>
  );
}

/* ─── Bottom Bar ──────────────────────────────────────────────────────── */
function BottomBar({ lang, onNav, favCnt, cartCnt, onCart }){
  const L = T[lang];
  return (
    <nav className="btmbar">
      <button onClick={()=>onNav("home")}><span className="lic"><Ic.home/></span>{L.bottom.home}</button>
      <button onClick={()=>onNav("catalog")}><span className="lic"><Ic.grid/></span>{L.bottom.catalog}</button>
      <button onClick={()=>onNav("fav")}><span className="lic"><Ic.heart/></span>{L.bottom.fav}{favCnt>0&&<span className="cnt">{favCnt}</span>}</button>
      <button onClick={onCart}><span className="lic"><Ic.cart/></span>{L.bottom.cart}{cartCnt>0&&<span className="cnt">{cartCnt}</span>}</button>
      <a className="wac" href={waUrl(L.wa.intro)} target="_blank" rel="noreferrer"><span className="lic"><Ic.wa/></span>{L.bottom.wa}</a>
    </nav>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────── */
export default function FurnitureStore(){
  const [lang,    setLang]    = useState("he");
  const [filter,  setFilter]  = useState("all");
  const [selected,setSelected]= useState(null);
  const [scrolled,setScrolled]= useState(false);
  const [favs,    setFavs]    = useState([]);
  const [cart,    setCart]    = useState([]);
  const [cartOpen,setCartOpen]= useState(false);

  useEffect(()=>{ document.documentElement.dir="rtl"; document.documentElement.lang=lang; },[lang]);
  useEffect(()=>{ const s=()=>setScrolled(window.scrollY>10); window.addEventListener("scroll",s); return()=>window.removeEventListener("scroll",s); },[]);
  useEffect(()=>{
    const els=document.querySelectorAll(".rv");
    const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),{ threshold:.1 });
    els.forEach(el=>io.observe(el));
    return()=>io.disconnect();
  },[lang,filter]);

  const scrollTo = id => { const el=document.getElementById(id); if(el) el.scrollIntoView({behavior:"smooth",block:"start"}); };
  const handleNav = k => {
    const map={ home:"r-home", catalog:"r-catalog", colors:"r-colors", gallery:"r-gallery", reviews:"r-reviews", contact:"r-contact" };
    if(map[k]) scrollTo(map[k]);
    else if(["chairs","beds","salons"].includes(k)){ setFilter(k); scrollTo("r-catalog"); }
    else if(k==="fav"){ setFilter("fav"); scrollTo("r-catalog"); }
  };
  const toggleFav = id => setFavs(f=>f.includes(id)?f.filter(x=>x!==id):[...f,id]);
  const addCart   = it => setCart(c=>[...c,it]);
  const rmCart    = uid => setCart(c=>c.filter(x=>x.uid!==uid));
  const L = T[lang];

  return (
    <div className="r">
      <style>{CSS}</style>
      <Header lang={lang} setLang={setLang} onNav={handleNav} scrolled={scrolled} favCnt={favs.length} cartCnt={cart.length} onCart={()=>setCartOpen(true)}/>
      <HeroSlider lang={lang} onCatalog={()=>scrollTo("r-catalog")}/>
      <ValueSection lang={lang}/>
      <CatalogSec lang={lang} filter={filter} setFilter={setFilter} onOpen={setSelected} favs={favs} onFav={toggleFav}/>
      <ColorsSec lang={lang}/>
      <ReviewsSec lang={lang}/>
      <GallerySec lang={lang}/>
      <TrustSec lang={lang}/>
      <ContactSec lang={lang}/>
      <FooterSec lang={lang} onNav={handleNav}/>

      {/* Floating WhatsApp with bubble */}
      <div className="fab">
        <div className="fab-bubble">{L.waFloatSub}</div>
        <a className="fab-btn" href={waUrl(L.wa.intro)} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Ic.wa/></a>
      </div>

      <BottomBar lang={lang} onNav={handleNav} favCnt={favs.length} cartCnt={cart.length} onCart={()=>setCartOpen(true)}/>

      {selected  && <PModal p={selected} lang={lang} onClose={()=>setSelected(null)} onAddCart={addCart}/>}
      {cartOpen  && <CartDrawer lang={lang} cart={cart} onClose={()=>setCartOpen(false)} onRemove={rmCart}/>}
    </div>
  );
}
