import { DashboardHeader } from "@/components/dashboard-header";
import { ScheduledEmailsSection } from "@/components/scheduled-emails-section";
import { listEmails } from "@/server/api";

export default async function Home() {
  const result = await listEmails().then(
    (emails) => ({ emails, error: null as string | null }),
    (err) => ({
      emails: [] as Awaited<ReturnType<typeof listEmails>>,
      error: err instanceof Error ? err.message : "Failed to load emails",
    })
  );
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <DashboardHeader />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <ScheduledEmailsSection initialEmails={result.emails} error={result.error} />
      </main>
    </div>
  );
}