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
} from "lucide-react";

export default function DownloadPage() {
  const [mounted, setMounted] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  // ✅ Use proxy endpoint - backend IP hidden
  const APK_URL = "/api/download";
  
  // Base URL untuk QR (full URL ke /api/download untuk auto-download)
  const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";
  const QR_VALUE = `${BASE_URL}${APK_URL}`; // Langsung ke /api/download

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = async () => {
    if (downloading) return;

    try {
      setDownloading(true);
      setProgress(0);
      setShowInstructions(false);

      const xhr = new XMLHttpRequest();
      xhr.open("GET", APK_URL, true);
      xhr.responseType = "blob";

      xhr.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
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
          throw new Error(`Download gagal: ${xhr.status}`);
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
      alert("Gagal mengunduh file. Cek koneksi atau coba lagi nanti.");
    }
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

      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-8 max-w-full"> {/* Kurangi padding mobile, max-w-full */}
        <header className="text-center mb-8 animate-fade-in"> {/* Kurangi mb mobile */}
          <div className="flex items-center justify-center mb-4"> {/* Kurangi mb mobile */}
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white bg-opacity-95 p-4 sm:p-6 rounded-full shadow-2xl backdrop-blur-sm flex items-center justify-center"> {/* Kurangi padding mobile */}
                <Image 
                  src="/icon.png" 
                  alt="Logo Sherlock Bangsamsir" 
                  width={48} // Kurangi ukuran mobile
                  height={48}
                  className="object-contain sm:w-16 sm:h-16" // Responsive ukuran
                />
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2"> {/* Kurangi font mobile */}
            <span className="bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent drop-shadow-lg">
              SHERLOCK BANGSAMSIR
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white text-opacity-90 drop-shadow-md mb-1 sm:mb-2"> {/* Kurangi font & mb mobile */}
            Bank Sampah Digital Smart Green Hospital
          </p>
          <p className="text-sm sm:text-base text-white text-opacity-80 drop-shadow-md"> {/* Kurangi font mobile */}
            RSUD Mohammad Natsir Solok
          </p>

          <div className="inline-flex items-center gap-2 mt-2 sm:mt-4 px-3 sm:px-4 py-1 sm:py-2 bg-white bg-opacity-90 text-emerald-700 rounded-full text-xs sm:text-sm font-medium drop-shadow-lg backdrop-blur-sm"> {/* Kurangi ukuran mobile */}
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Versi 1.0.0 - Stabil
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:gap-8 mb-8"> {/* Eksplisit grid-cols-1 mobile, gap lebih kecil */}
          <div className="bg-white bg-opacity-95 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-8 border border-white border-opacity-20 animate-slide-in-left backdrop-blur-sm"> {/* Kurangi padding & radius mobile */}
            <div className="text-center mb-4 sm:mb-6"> {/* Kurangi mb mobile */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2"> {/* Kurangi font mobile */}
                Scan QR Code
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm"> {/* Kurangi font mobile */}
                Scan dengan kamera HP Android untuk download langsung
              </p>
            </div>

            <div className="flex justify-center mb-4 sm:mb-6"> {/* Kurangi mb mobile */}
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-lg"> {/* Kurangi padding & radius mobile */}
                  <QRCodeSVG
                    value={QR_VALUE}
                    size={200} // Kurangi size mobile
                    level="H"
                    includeMargin={true}
                    bgColor="#ffffff"
                    fgColor="#059669"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600"> {/* Kurangi space & font mobile */}
              <div className="flex items-start gap-2 sm:gap-3"> {/* Kurangi gap mobile */}
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 font-bold text-xs">1</span>
                </div>
                <p className="break-words">Buka aplikasi Kamera di HP Android</p> {/* Tambah break-words */}
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 font-bold text-xs">2</span>
                </div>
                <p className="break-words">Arahkan kamera ke QR Code di atas</p>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-600 font-bold text-xs">3</span>
                </div>
                <p className="break-words">Browser akan otomatis mulai download APK</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 animate-slide-in-right"> {/* Kurangi space mobile */}
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-8 text-white drop-shadow-2xl"> {/* Kurangi padding & radius mobile */}
              <div className="text-center mb-4 sm:mb-6"> {/* Kurangi mb mobile */}
                <Smartphone className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 opacity-90" /> {/* Kurangi ukuran mobile */}
                <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2"> {/* Kurangi font mobile */}
                  Download untuk Android
                </h2>
                <p className="text-emerald-100 text-xs sm:text-sm"> {/* Kurangi font mobile */}
                  File APK • Gratis • Aman
                </p>
              </div>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full bg-white text-emerald-600 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed mb-3 sm:mb-4"> {/* Kurangi padding & font mobile */}
                {downloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-emerald-600"></div>
                    Mengunduh...
                  </>
                ) : (
                  <>
                    <Image 
                      src="/icon.png" 
                      alt="Download Icon" 
                      width={16}
                      height={16}
                      className="object-contain sm:w-5 sm:h-5" // Responsive
                    />
                    Unduh APK
                  </>
                )}
              </button>

              {downloading && (
                <div className="space-y-1 sm:space-y-2"> {/* Kurangi space mobile */}
                  <div className="flex justify-between text-xs text-emerald-100"> {/* Font kecil mobile */}
                    <span>Proses download</span>
                    <span>{progress}%</span>
                  </div>
                  <progress
                    value={progress}
                    max="100"
                    className="w-full h-1.5 sm:h-2 rounded-full"
                    style={{ backgroundColor: 'emerald-200' }}
                  />
                </div>
              )}

              <p className="text-xs text-emerald-100 text-center mt-2 sm:mt-4"> {/* Kurangi mt mobile */}
                Dengan mengunduh, Anda menyetujui kebijakan privasi kami
              </p>
            </div>

            <div className="bg-white bg-opacity-95 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-white border-opacity-20 backdrop-blur-sm"> {/* Kurangi padding & radius mobile */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2"> {/* Kurangi font mobile */}
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                Fitur Aplikasi
              </h3>
              <div className="space-y-2 sm:space-y-3"> {/* Kurangi space mobile */}
                {[
                  "Transaksi setoran sampah digital",
                  "Monitoring saldo real-time",
                  "Riwayat transaksi lengkap",
                  "Edukasi ekonomi sirkular",
                  "Notifikasi transaksi otomatis",
                  "Penarikan saldo mudah",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3"> {/* Kurangi gap mobile */}
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700 text-xs sm:text-sm break-words">{feature}</span> {/* Tambah break-words */}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 bg-opacity-95 border border-amber-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm"> {/* Kurangi padding & radius mobile */}
              <h3 className="text-xs sm:text-sm font-bold text-amber-900 mb-2 sm:mb-3 flex items-center gap-2"> {/* Kurangi font mobile */}
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                Persyaratan Sistem
              </h3>
              <ul className="space-y-1 sm:space-y-2 text-xs text-amber-800"> {/* Kurangi space mobile */}
                <li>• Android 7.0 (Nougat) atau lebih baru</li>
                <li>• Minimal 100 MB ruang penyimpanan</li>
                <li>• Koneksi internet aktif</li>
                <li>• Izinkan instalasi dari &quot;Unknown Sources&quot;</li>
              </ul>
            </div>
          </div>
        </div>

        {showInstructions && (
          <div className="bg-blue-50 bg-opacity-95 border border-blue-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 mb-6 sm:mb-8 animate-fade-in backdrop-blur-sm"> {/* Kurangi padding & radius mobile */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6"> {/* Kurangi gap & mb mobile */}
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-1 sm:mb-2"> {/* Kurangi font mobile */}
                  Cara Install APK
                </h3>
                <p className="text-blue-700 text-xs sm:text-sm mb-3 sm:mb-4"> {/* Kurangi font mobile */}
                  Ikuti langkah-langkah berikut untuk menginstall aplikasi:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"> {/* Grid 1 kolom mobile, 2 sm, 3 md */}
              <div className="bg-white bg-opacity-90 rounded-xl p-3 sm:p-4 border border-blue-100"> {/* Kurangi padding mobile */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mb-2 sm:mb-3"> {/* Kurangi ukuran mobile */}
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm"> {/* Kurangi font mobile */}
                  Buka File Manager
                </h4>
                <p className="text-xs text-gray-600 break-words"> {/* Tambah break-words */}
                  Cari file APK yang sudah diunduh di folder Download
                </p>
              </div>

              <div className="bg-white bg-opacity-90 rounded-xl p-3 sm:p-4 border border-blue-100">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mb-2 sm:mb-3">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm">
                  Izinkan Instalasi
                </h4>
                <p className="text-xs text-gray-600 break-words">
                  Aktifkan &quot;Install from Unknown Sources&quot; jika diminta
                </p>
              </div>

              <div className="bg-white bg-opacity-90 rounded-xl p-3 sm:p-4 border border-blue-100">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mb-2 sm:mb-3">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm">
                  Install & Buka
                </h4>
                <p className="text-xs text-gray-600 break-words">
                  Tap Install, tunggu selesai, lalu buka aplikasi
                </p>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center text-white text-opacity-90 text-sm space-y-1 sm:space-y-2 drop-shadow-md px-2"> {/* Kurangi space & tambah px mobile */}
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4"> {/* Kurangi mb mobile */}
            <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-300" />
            <p className="font-medium text-white text-opacity-90 text-xs sm:text-sm"> {/* Kurangi font mobile */}
              Bersama Wujudkan Rumah Sakit Hijau
            </p>
          </div>
          <p className="text-xs"> {/* Font kecil mobile */}
            © 2025 RSUD Mohammad Natsir Solok. All rights reserved.
          </p>
          <p className="text-xs text-white text-opacity-70 break-words"> {/* Tambah break-words */}
            Dikembangkan oleh Maizan Insani Akbar dari SIMRS pada RSUD Mohammad Natsir Solok
          </p>
        </footer>
      </div>
    </div>
  );
}