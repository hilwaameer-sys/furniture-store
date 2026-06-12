export const metadata = {
  title: "רהיטי הבית | أثاث البيت",
  description:
    "רהיטים איכותיים בהתאמה אישית — סלונים, מיטות וכיסאות. أثاث عالي الجودة بتفصيل حسب الطلب.",
  openGraph: {
    title: "רהיטי הבית | أثاث البيت",
    description: "ישירות מהיצרן · מחירים הוגנים · הובלה והרכבה",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700;900&family=Heebo:wght@300;400;500;600;700;800&family=El+Messiri:wght@500;600;700&family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
