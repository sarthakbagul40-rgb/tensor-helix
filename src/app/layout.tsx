import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delicious Biryani — Freshly Cooked Food",
  description:
    "Savoring Stories with Every Bite. Authentic Indian Biryani crafted with heritage spices. Order now or inquire about catering services.",
  keywords: ["biryani", "chicken biryani", "Indian food", "catering", "restaurant"],
  openGraph: {
    title: "Delicious Biryani — Freshly Cooked Food",
    description:
      "Authentic Indian Biryani crafted with heritage spices. Order now.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fbf9f1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
