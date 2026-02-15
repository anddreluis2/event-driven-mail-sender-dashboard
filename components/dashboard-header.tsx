"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScheduleEmailModal } from "./schedule-email-modal";

export function DashboardHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
      <h1 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Email Scheduler
      </h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus:ring-zinc-50"
          >
            Schedule Email
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Email</DialogTitle>
          </DialogHeader>
          <ScheduleEmailModal onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </header>
  );
}
