import type { Metadata, Viewport } from "next";
import { Anton, Bangers, Space_Mono, Noto_Sans_JP } from "next/font/google";
import RegisterSW from "@/components/RegisterSW";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers" });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });
const jp = Noto_Sans_JP({ weight: "900", subsets: ["latin"], preload: false, variable: "--font-jp" });

export const metadata: Metadata = {
  title: "ICHIGOQUIZ — ¿Qué personaje sos?",
  description: "Respondé 8 preguntas y descubrí qué personaje de Bleach sos. ¡BANKAI!",
  applicationName: "Ichigoquiz",
  appleWebApp: { capable: true, title: "Ichigoquiz", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anton.variable} ${bangers.variable} ${mono.variable} ${jp.variable}`}>
      <body>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
