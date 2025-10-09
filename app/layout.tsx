import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POS ONE - Phần mềm quản lý bán hàng thông minh",
  description: "Giải pháp quản lý bán hàng và vận hành chuỗi toàn diện. Tích hợp thanh toán, quản lý kho, báo cáo thông minh - tất cả trong một hệ thống.",
  keywords: "POS, quản lý bán hàng, phần mềm quản lý, quản lý kho, thanh toán, báo cáo bán hàng, POS ONE",
  icons: {
    icon: "https://api-kom.kas.asia/api/uploads/avatar/avatar_1750042090886.png",
    shortcut: "https://api-kom.kas.asia/api/uploads/avatar/avatar_1750042090886.png",
    apple: "https://api-kom.kas.asia/api/uploads/avatar/avatar_1750042090886.png",
  },
  openGraph: {
    title: "POS ONE - Phần mềm quản lý bán hàng thông minh",
    description: "Giải pháp quản lý bán hàng và vận hành chuỗi toàn diện. Tích hợp thanh toán, quản lý kho, báo cáo thông minh.",
    url: "https://posone.vn",
    siteName: "POS ONE",
    images: [
      {
        url: "https://api-kom.kas.asia/api/uploads/avatar/avatar_1750042090886.png",
        width: 1200,
        height: 630,
        alt: "POS ONE Logo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "POS ONE - Phần mềm quản lý bán hàng thông minh",
    description: "Giải pháp quản lý bán hàng và vận hành chuỗi toàn diện.",
    images: ["https://api-kom.kas.asia/api/uploads/avatar/avatar_1750042090886.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
