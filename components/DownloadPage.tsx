"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import {
  Smartphone,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Leaf,
  Globe,
} from "lucide-react";

export default function DownloadPage() {
  const [mounted, setMounted] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use proxy endpoint
  const APK_URL = "/api/download/apk";
  
  // Base URL untuk QR
  const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";
  const QR_VALUE = `${BASE_URL}${APK_URL}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let fakeProgressInterval: NodeJS.Timeout | null = null;

    if (downloading && progress === 0) {
      // Fake progress: meningkat dari 0% ke 13% dalam 4 detik
      let fakeProgress = 0;
      fakeProgressInterval = setInterval(() => {
        fakeProgress += 1;
        if (fakeProgress <= 13) {
          setProgress(fakeProgress);
        } else {
          clearInterval(fakeProgressInterval!);
        }
      }, 400);
    }

    return () => {
      if (fakeProgressInterval) {
        clearInterval(fakeProgressInterval);
      }
    };
  }, [downloading]);

  const handleDownload = async () => {
    if (downloading) return;

    try {
      setDownloading(true);
      setProgress(0);
      setErrorMessage(null);
      setShowInstructions(false);

      const xhr = new XMLHttpRequest();
      xhr.open("GET", APK_URL, true);
      xhr.responseType = "blob";

      xhr.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.max(10, (event.loaded / event.total) * 100);
          setProgress(Math.round(percentComplete));
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const blob = new Blob([xhr.response], { type: "application/vnd.android.package-archive" });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "SHERLOCK-BANGSAMSIR.apk";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          setTimeout(() => {
            setShowInstructions(true);
            setDownloading(false);
            setProgress(0);
          }, 1000);
        } else {
          throw new Error(`Download gagal: Status ${xhr.status}`);
        }
      });

      xhr.addEventListener("error", () => {
        throw new Error("Koneksi error saat download");
      });

      xhr.send();
    } catch (error) {
      console.error("Download error:", error);
      setDownloading(false);
      setProgress(0);
      setErrorMessage(error instanceof Error ? error.message : "Gagal mengunduh file. Cek koneksi atau coba lagi nanti.");
    }
  };

  // Fallback download menggunakan <a> langsung
  const handleDirectDownload = () => {
    const link = document.createElement("a");
    link.href = APK_URL;
    link.download = "SHERLOCK-BANGSAMSIR.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat md:bg-fixed" style={{ backgroundImage: 'url(/rs.png)' }}>
      {/* Overlay gelap untuk readability pada background foto */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-300 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>

      <div className="relative z-10 container mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8 max-w-7xl">
        <header className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white bg-opacity-95 p-3 sm:p-4 md:p-6 rounded-full shadow-2xl backdrop-blur-sm flex items-center justify-center">
                <Image 
                  src="/icon.png" 
                  alt="Logo Sherlock Bangsamsir" 
                  width={40}
                  height={40}
                  className="object-contain sm:w-12 md:w-16 sm:h-12 md:h-16"
                />
              </div>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-1 sm:mb-2">
            <span className="bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent drop-shadow-lg">
              SHERLOCK BANGSAMSIR
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-md mb-3 sm:mb-4 px-2 sm:px-0">
            Bank Sampah Digital Smart Green Hospital RSUD Mohammad Natsir Solok
          </p>
        </header>

        {/* Download Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 animate-slide-in-left">
          {/* QR Code Card */}
          <div className="bg-white bg-opacity-95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-900 mb-3 sm:mb-4 text-center">
              Scan QR untuk Download
            </h2>
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 md:p-4 bg-white rounded-xl shadow-md">
                <QRCodeSVG
                  value={QR_VALUE}
                  size={140}
                  className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px]"
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-emerald-700 text-center break-words">
              Scan dengan kamera ponsel Anda untuk unduh langsung
            </p>
          </div>

          {/* Download Button Card */}
          <div className="bg-white bg-opacity-95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-sm">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-900 mb-3 sm:mb-4 text-center">
              Unduh Aplikasi
            </h2>

            {/* Tombol Baru: Buka di Web */}
            <a
              href="http://103.84.208.182:8016/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-3 sm:mb-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              Buka di Web
            </a>

            {/* Tombol Download */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              {downloading ? `Downloading... ${progress}%` : "Download APK"}
            </button>

            {/* Fallback Download Button */}
            {errorMessage && (
              <div className="mt-3 sm:mt-4">
                <p className="text-xs sm:text-sm text-red-600 text-center break-words mb-2">
                  {errorMessage}
                </p>
                <button
                  onClick={handleDirectDownload}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg"
                >
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  Coba Download Langsung
                </button>
              </div>
            )}

            {downloading && (
              <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <p className="text-xs sm:text-sm text-emerald-700 mt-3 sm:mt-4 text-center break-words">
              Versi 1.0.0 | Ukuran ~100MB
            </p>
          </div>
        </div>

        {/* Fitur Section */}
        <div className="bg-white bg-opacity-95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 shadow-2xl backdrop-blur-sm animate-slide-in-right">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-900 mb-3 sm:mb-4 md:mb-6 text-center">
            Fitur Unggulan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg text-emerald-900 mb-1">
                  Aman & Terpercaya
                </h3>
                <p className="text-xs sm:text-sm text-emerald-700 break-words">
                  Sistem keamanan data pasien terintegrasi dengan SIMRS
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg text-emerald-900 mb-1">
                  Cepat & Efisien
                </h3>
                <p className="text-xs sm:text-sm text-emerald-700 break-words">
                  Proses setoran sampah dalam hitungan detik
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base md:text-lg text-emerald-900 mb-1">
                  Ramah Lingkungan
                </h3>
                <p className="text-xs sm:text-sm text-emerald-700 break-words">
                  Dukung program green hospital RSUD Mohammad Natsir
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Persyaratan Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div className="bg-white bg-opacity-95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-sm">
            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-1" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-900">
                Persyaratan Sistem
              </h3>
            </div>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-green-800">
              <li>• Android 7.0 (Nougat) atau lebih baru</li>
              <li>• Minimal 100 MB ruang penyimpanan</li>
              <li>• Koneksi internet aktif</li>
              <li>• Izinkan instalasi dari &quot;Unknown Sources&quot;</li>
            </ul>
          </div>

          <div className="bg-white bg-opacity-95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-sm">
            <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-600 flex-shrink-0 mt-1" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-amber-900">
                Catatan Penting
              </h3>
            </div>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-amber-800">
              <li>• Hanya untuk pengguna Android</li>
              <li>• Update aplikasi secara berkala</li>
              <li>• Hubungi admin jika ada kendala</li>
              <li>• Data dilindungi sesuai regulasi</li>
            </ul>
          </div>
        </div>

        {/* Instruksi Instalasi */}
        {showInstructions && (
          <div className="bg-blue-50 bg-opacity-95 border border-blue-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 animate-fade-in backdrop-blur-sm">
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-900 mb-1 sm:mb-2">
                  Cara Install APK
                </h3>
                <p className="text-blue-700 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 break-words">
                  Ikuti langkah-langkah berikut untuk menginstall aplikasi:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="bg-white bg-opacity-90 rounded-xl p-3 sm:p-4 md:p-5 border border-blue-100">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mb-2 sm:mb-3">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                  Buka File Manager
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  Cari file APK yang sudah diunduh di folder Download
                </p>
              </div>

              <div className="bg-white bg-opacity-90 rounded-xl p-3 sm:p-4 md:p-5 border border-blue-100">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mb-2 sm:mb-3">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                  Izinkan Instalasi
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  Aktifkan &quot;Install from Unknown Sources&quot; jika diminta
                </p>
              </div>

              <div className="bg-white bg-opacity-90 rounded-xl p-3 sm:p-4 md:p-5 border border-blue-100">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mb-2 sm:mb-3">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                  Install & Buka
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  Tap Install, tunggu selesai, lalu buka aplikasi
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-white text-opacity-90 text-xs sm:text-sm space-y-1 sm:space-y-2 drop-shadow-md px-2 sm:px-4">
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2 md:mb-4">
            <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-300" />
            <p className="font-medium text-white text-opacity-90 text-xs sm:text-sm">
              Bersama Wujudkan Rumah Sakit Hijau
            </p>
          </div>
          <p className="text-xs sm:text-sm break-words">
            © 2025 RSUD Mohammad Natsir Solok. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-white text-opacity-70 break-words">
            Dikembangkan oleh Maizan Insani Akbar dari SIMRS pada RSUD Mohammad Natsir Solok
          </p>
        </footer>
      </div>
    </div>
  );
}