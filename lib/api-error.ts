function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function firstIssueMessage(issues: unknown): string | null {
  if (!Array.isArray(issues) || issues.length === 0) return null;
  const first = issues[0];
  if (isRecord(first) && typeof first.message === "string") {
    return first.message;
  }
  return null;
}

export function parseApiError(body: unknown, fallback: string): string {
  if (typeof body === "string") return body;
  if (!isRecord(body)) return fallback;

  const err = body.error ?? body.message;
  if (typeof err === "string") return err;
  if (isRecord(err) && typeof err.message === "string") return err.message;
  if (isRecord(err)) {
    const fromIssues = firstIssueMessage(err.issues);
    if (fromIssues) return fromIssues;
  }

  if (isRecord(body.errors)) {
    const first = Object.values(body.errors)[0];
    if (typeof first === "string") return first;
  }

  return fallback;
}
