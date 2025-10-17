// app/api/download/route.ts
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function GET() {
  try {
    // ✅ Backend URL from environment variable (not exposed to client)
    const backendUrl = process.env.BACKEND_URL || "http://103.84.208.182:8016";
    const apkUrl = `${backendUrl}/apk/sherlock-bangsamsir.apk`;

    console.log("🔄 Proxying APK download from backend...");

    // Fetch dari backend sebagai stream
    const response = await fetch(apkUrl, {
      headers: {
        "User-Agent": "Vercel-Proxy/1.0",
      },
    });

    if (!response.ok) {
      console.error(`❌ Backend returned ${response.status}`);
      throw new Error("Failed to fetch APK from backend");
    }

    // ✅ Check body ada sebelum stream
    if (!response.body) {
      throw new Error("No response body available");
    }

    // Stream response body langsung ke NextResponse (tanpa fallback [] yang bikin type error)
    const stream = Readable.fromWeb(response.body);
    
    console.log(`✅ APK streaming started (Content-Length: ${response.headers.get('content-length')} bytes)`);

    // Return streamed response dengan headers proper
    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": 'attachment; filename="SHERLOCK-BANGSAMSIR.apk"',
        "Content-Length": response.headers.get('content-length') || 'unknown',
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
        // Tambah header untuk streaming
        "Transfer-Encoding": "chunked",
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

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}