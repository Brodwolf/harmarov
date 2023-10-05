import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "admin.harmarov",
  description: "Passionate about education and changing people's lives through programming.",
  manifest: "/manifest.json",
  icons: { apple: "/icon-512x512.png" },
  themeColor: "#7437ff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
