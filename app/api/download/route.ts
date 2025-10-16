// app/api/download/route.ts - Di project Vercel
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch APK dari backend tanpa expose IP
    const backendUrl = process.env.BACKEND_URL || "http://103.84.208.182:8016";
    const apkUrl = `${backendUrl}/apk/sherlock-bangsamsir.apk`;

    console.log("🔄 Proxying APK download from backend...");

    // Fetch file dari backend
    const response = await fetch(apkUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch APK from backend");
    }

    // Get file as buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Return dengan proper headers
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": 'attachment; filename="SHERLOCK-BANGSAMSIR.apk"',
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("❌ Error proxying APK:", error);
    return NextResponse.json(
      { success: false, message: "Failed to download APK" },
      { status: 500 }
    );
  }
}