import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pass De Aux — Nederlandse hiphop, doorgegeven",
  description:
    "Podcast, playlist en radio. Elke week geeft Pass De Aux de aux door aan de beste artiesten van Nederland. Elke zondag 15:00 een nieuwe aflevering, maandag live op GLXY.RADIO.",
  openGraph: {
    title: "Pass De Aux 🌐",
    description:
      "Het platform voor Nederlandse hiphop: podcast, 110K+ playlist en live radio.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
