"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Download,
  Smartphone,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Leaf,
  Recycle,
} from "lucide-react";

export default function DownloadPage() {
  const [mounted, setMounted] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // URL APK dari backend
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const APK_URL = `${BACKEND_URL}/apk/sherlock-bangsamsir.apk`;


  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const link = document.createElement("a");
      link.href = APK_URL;
      link.download = "SHERLOCK-BANGSAMSIR.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setShowInstructions(true);
        setDownloading(false);
      }, 1000);
    } catch (error) {
      console.error("Download error:", error);
      setDownloading(false);
      alert("Gagal mengunduh file. Silakan coba lagi.");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-300 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white p-4 rounded-full shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                  <Recycle className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              SHERLOCK BANGSAMSIR
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Bank Sampah Digital Smart Green Hospital
          </p>
          <p className="text-base text-gray-500">
            RSUD Mohammad Natsir Solok
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Versi 1.0.0 - Stabil
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-slide-in-left">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Scan QR Code
              </h2>
              <p className="text-gray-600 text-sm">
                Scan dengan kamera HP Android Anda
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-lg">
                  <QRCodeSVG
                    value={DOWNLOAD_PAGE_URL || APK_URL}
                    size={240}
                    level="H"
                    includeMargin={true}
                    bgColor="#ffffff"
                    fgColor="#059669"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 font-bold text-xs">1</span>
                </div>
                <p>Buka aplikasi Kamera di HP Android</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 font-bold text-xs">2</span>
                </div>
                <p>Arahkan kamera ke QR Code di atas</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 font-bold text-xs">3</span>
                </div>
                <p>Tap notifikasi untuk mulai download</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl shadow-2xl p-8 text-white">
              <div className="text-center mb-6">
                <Smartphone className="w-16 h-16 mx-auto mb-4 opacity-90" />
                <h2 className="text-2xl font-bold mb-2">
                  Download untuk Android
                </h2>
                <p className="text-emerald-100 text-sm">
                  File APK &bull; Gratis &bull; Aman
                </p>
              </div>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full bg-white text-emerald-600 py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                {downloading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
                    Mengunduh...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Unduh APK
                  </>
                )}
              </button>

              <p className="text-xs text-emerald-100 text-center mt-4">
                Dengan mengunduh, Anda menyetujui kebijakan privasi kami
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                Fitur Aplikasi
              </h3>
              <div className="space-y-3">
                {[
                  "Transaksi setoran sampah digital",
                  "Monitoring saldo real-time",
                  "Riwayat transaksi lengkap",
                  "Edukasi ekonomi sirkular",
                  "Notifikasi transaksi otomatis",
                  "Penarikan saldo mudah",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Persyaratan Sistem
              </h3>
              <ul className="space-y-2 text-xs text-amber-800">
                <li>&bull; Android 7.0 (Nougat) atau lebih baru</li>
                <li>&bull; Minimal 100 MB ruang penyimpanan</li>
                <li>&bull; Koneksi internet aktif</li>
                <li>&bull; Izinkan instalasi dari &quot;Unknown Sources&quot;</li>
              </ul>
            </div>
          </div>
        </div>

        {showInstructions && (
          <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 mb-8 animate-fade-in">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  Cara Install APK
                </h3>
                <p className="text-blue-700 text-sm mb-4">
                  Ikuti langkah-langkah berikut untuk menginstall aplikasi:
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-blue-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mb-3">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Buka File Manager
                </h4>
                <p className="text-sm text-gray-600">
                  Cari file APK yang sudah diunduh di folder Download
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mb-3">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Izinkan Instalasi
                </h4>
                <p className="text-sm text-gray-600">
                  Aktifkan &quot;Install from Unknown Sources&quot; jika diminta
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mb-3">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Install &amp; Buka
                </h4>
                <p className="text-sm text-gray-600">
                  Tap Install, tunggu selesai, lalu buka aplikasi
                </p>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center text-gray-600 text-sm space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <p className="font-medium text-gray-700">
              Bersama Wujudkan Rumah Sakit Hijau
            </p>
          </div>
          <p>
            &copy; 2025 RSUD Mohammad Natsir Solok. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Dikembangkan oleh Tim IT SIMRS RSUD Mohammad Natsir
          </p>
        </footer>
      </div>
    </div>
  );
}