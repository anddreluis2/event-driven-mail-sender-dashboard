import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.API_URL ?? "http://localhost:8787";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const res = await fetch(`${API_BASE}/emails?${searchParams.toString()}`, {
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json(
      { error: (data as { error?: string }).error ?? "Failed to fetch emails" },
      { status: res.status }
    );
  }
  return NextResponse.json(data);
}
