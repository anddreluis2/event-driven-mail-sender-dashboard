import { scheduleEmail } from "@/server/api";
import { scheduleEmailSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = scheduleEmailSchema.safeParse(body);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const path = err.path[0] as string;
        if (path && !errors[path]) errors[path] = err.message;
      });
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    await scheduleEmail(result.data);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to schedule email";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
