import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Download SHERLOCK BANGSAMSIR - Bank Sampah Digital",
  description: "Download aplikasi mobile SHERLOCK BANGSAMSIR - Sistem Bank Sampah Digital Smart Green Hospital RSUD Mohammad Natsir Solok",
  keywords: ["bank sampah", "RSUD Mohammad Natsir", "green hospital", "download apk"],
  openGraph: {
    title: "Download SHERLOCK BANGSAMSIR",
    description: "Aplikasi Bank Sampah Digital Smart Green Hospital",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}