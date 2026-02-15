import type { ListedEmail } from "@/lib/types";

const API_BASE = process.env.API_URL ?? "http://localhost:8787";

export async function listEmails(opts?: { page?: number }) {
  const params = opts?.page ? `?page=${opts.page}` : "";
  const res = await fetch(`${API_BASE}/emails${params}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (data as { error?: string }).error ?? "Failed to fetch emails"
    );
  }
  return data as {
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
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ??
        (err as { error?: string }).error ??
        `Request failed: ${res.status}`,
    );
  }

  return res.json();
}

