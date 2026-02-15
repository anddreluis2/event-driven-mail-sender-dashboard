import { DashboardHeader } from "@/components/dashboard-header";
import { ScheduledEmailsSection } from "@/components/scheduled-emails-section";
import { listEmails } from "@/server/api";

type HomeProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { page: pageParam } = await searchParams;
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;

  const result = await listEmails({ page }).then(
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
