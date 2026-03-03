import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// DQ3風ピクセルフォント
const dotGothic = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "やま▲こん～やまのゆうしゃたち～",
  description: "日本全国の名峰のコンディションをRPG風に冒険しよう！山の勇者よ、最高の景色を求めて旅立て！",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "やま▲こん～やまのゆうしゃたち～",
    description: "日本全国の名峰のコンディションをRPG風に冒険しよう！",
    images: [{ url: "/ogp.png", width: 1200, height: 630 }],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "やま▲こん～やまのゆうしゃたち～",
    description: "日本全国の名峰のコンディションをRPG風に冒険しよう！",
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
      <body className={`${dotGothic.variable} antialiased season-winter`} style={{ fontFamily: "var(--font-pixel)" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
