import { headers } from "next/headers";
import { DashboardHeader } from "@/components/dashboard-header";
import { ScheduledEmailsSection } from "@/components/scheduled-emails-section";
import type { ListedEmail } from "@/lib/types";

type HomeProps = {
  searchParams: Promise<{ page?: string }>;
};

async function fetchEmails(page: number) {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const base = `${protocol}://${host}`;
  const res = await fetch(`${base}/api/emails?page=${page}`, {
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (data as { error?: string }).error ?? "Failed to fetch emails",
    );
  }
  return data as {
    emails: ListedEmail[];
    total: number;
    page: number;
    limit: number;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { page: pageParam } = await searchParams;
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;

  const result = await fetchEmails(page).then(
    (data) => ({ data, error: null as string | null }),
    (err) => ({
      data: {
        emails: [],
        total: 0,
        page: 1,
        limit: 10,
      },
      error: err instanceof Error ? err.message : "Failed to load emails",
    }),
  );
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <DashboardHeader />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <ScheduledEmailsSection
          initialEmails={result.data.emails}
          total={result.data.total}
          page={result.data.page}
          limit={result.data.limit}
          error={result.error}
        />
      </main>
    </div>
  );
}
