import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";

// DQ3風ピクセルフォント
const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "スノコン ～雪の勇者たち～",
  description: "日本全国のスキー場のコンディションをRPG風に冒険しよう！雪山の勇者よ、最高のパウダーを求めて旅立て！",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "スノコン ～雪の勇者たち～",
    description: "日本全国のスキー場のコンディションをRPG風に冒険しよう！",
    images: [{ url: "/ogp.png", width: 1200, height: 630 }],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "スノコン ～雪の勇者たち～",
    description: "日本全国のスキー場のコンディションをRPG風に冒険しよう！",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${dotGothic.variable} antialiased`} style={{ fontFamily: "var(--font-pixel)" }}>
        {children}
      </body>
    </html>
  );
}
