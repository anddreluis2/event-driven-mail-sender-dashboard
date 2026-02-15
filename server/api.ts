import type { ListedEmail } from "@/lib/types";
import { parseApiError } from "@/lib/api-error";

const API_BASE = process.env.API_URL ?? "http://localhost:8787";

async function handleErrorResponse(
  res: Response,
  fallback: string,
): Promise<never> {
  const body = await res.json().catch(() => ({}));
  const message = parseApiError(body, `${fallback} (${res.status})`);
  throw new Error(message);
}

export async function listEmails(opts?: { page?: number }) {
  const params = opts?.page ? `?page=${opts.page}` : "";
  const res = await fetch(`${API_BASE}/emails${params}`);
  if (!res.ok) {
    await handleErrorResponse(res, "Failed to fetch emails");
  }
  return (await res.json()) as {
    emails: ListedEmail[];
    total: number;
    page: number;
    limit: number;
  };
}

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
    await handleErrorResponse(res, "Failed to schedule email");
  }

  return res.json();
}
