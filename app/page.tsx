import { DashboardHeader } from "@/components/dashboard-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <DashboardHeader />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <section>
          <h2 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Scheduled Emails
          </h2>
          <div className="rounded-lg border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-zinc-500 dark:text-zinc-400">
              No emails scheduled yet. Click &quot;Schedule Email&quot; to add one.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}