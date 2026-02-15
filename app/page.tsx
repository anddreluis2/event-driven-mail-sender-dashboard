import { DashboardHeader } from "@/components/dashboard-header";
import { ScheduledEmailsSection } from "@/components/scheduled-emails-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <DashboardHeader />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <ScheduledEmailsSection />
      </main>
    </div>
  );
}