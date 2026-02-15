/**
 * Server-side API. Calls the Hono backend.
 * Use only in Server Actions or Server Components.
 */

const API_BASE = process.env.API_URL ?? "http://localhost:8787";

export async function scheduleEmail(payload: {
  toEmail: string;
  subject: string;
  body: string;
  sendAt: string;
}) {
  const res = await fetch(`${API_BASE}/emails/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ??
        (err as { error?: string }).error ??
        `Request failed: ${res.status}`
    );
  }

  return res.json();
}
