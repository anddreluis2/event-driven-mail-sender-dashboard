"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pagination } from "@/components/ui/pagination";
import { ScheduleEmailModal } from "./schedule-email-modal";
import type { ListedEmail } from "@/lib/types";

type ScheduledEmailsSectionProps = {
  initialEmails: ListedEmail[];
  total: number;
  page: number;
  limit: number;
  error?: string | null;
};

export function ScheduledEmailsSection({
  initialEmails,
  total,
  page,
  limit,
  error,
}: ScheduledEmailsSectionProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = useCallback(() => {
    setOpen(false);
    router.refresh();
  }, [router]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Scheduled Emails
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-zinc-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:scale-[1.02] dark:hover:bg-zinc-200 dark:active:scale-[0.98] dark:focus:ring-zinc-50"
            >
              Schedule Email
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Email</DialogTitle>
            </DialogHeader>
            <ScheduleEmailModal onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        {error ? (
          <div className="p-12 text-center">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : initialEmails.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              No emails scheduled yet. Click &quot;Schedule Email&quot; to add one.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] table-fixed text-left text-sm">
              <colgroup>
                <col className="w-[30%]" />
                <col className="w-[90px]" />
                <col className="w-[200px]" />
                <col className="w-[160px]" />
                <col className="w-[160px]" />
              </colgroup>
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-950 dark:text-zinc-50">
                    Subject
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-950 dark:text-zinc-50">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-950 dark:text-zinc-50">
                    To
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-950 dark:text-zinc-50">
                    Sent at
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium text-zinc-950 dark:text-zinc-50">
                    Created at
                  </th>
                </tr>
              </thead>
              <tbody>
                {initialEmails.map((email) => (
                  <tr
                    key={email.id}
                    className="border-b border-zinc-100 last:border-0 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                  >
                    <td className="max-w-0 truncate px-4 py-3 text-zinc-950 dark:text-zinc-50" title={email.subject}>
                      {email.subject}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          email.status === "sent"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : email.status === "scheduled"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {email.status}
                      </span>
                    </td>
                    <td className="max-w-0 truncate px-4 py-3 text-zinc-600 dark:text-zinc-400" title={email.toEmail}>
                      {email.toEmail}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      {email.sentAt
                        ? format(new Date(email.sentAt), "PPp")
                        : "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-600 dark:text-zinc-400">
                      {format(new Date(email.createdAt), "PPp")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!error && total > 0 && (
          <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 bg-zinc-50/50 px-4 py-4 sm:flex-row dark:border-zinc-800/80 dark:bg-zinc-900/30">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{total}</span>
              {" "}total · page{" "}
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{page}</span>
              {" "}of{" "}
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{Math.ceil(total / limit)}</span>
            </p>
            <Pagination
              page={page}
              totalPages={Math.ceil(total / limit)}
              basePath="/"
              siblingCount={1}
            />
          </div>
        )}
      </div>
    </section>
  );
}
