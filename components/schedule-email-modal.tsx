"use client";

import { useActionState, useEffect, useState } from "react";
import { scheduleEmailAction, type ScheduleEmailState } from "@/actions/schedule-email";
import { DateTimePicker } from "./date-time-picker";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";

type ScheduleEmailModalProps = {
  onSuccess?: () => void;
};

const inputClassName =
  "flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-50";

const textareaClassName =
  "flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-50";

export function ScheduleEmailModal({ onSuccess }: ScheduleEmailModalProps) {
  const [sendAt, setSendAt] = useState<Date | undefined>(undefined);
  const [state, formAction, isPending] = useActionState<
    ScheduleEmailState | null,
    FormData
  >(scheduleEmailAction, null);

  useEffect(() => {
    if (state?.success) {
      onSuccess?.();
    }
  }, [state?.success, onSuccess]);

  const errors = state && !state.success && "errors" in state ? state.errors : undefined;
  const submitError = state && !state.success && "error" in state ? state.error : undefined;

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="sendAt" value={sendAt?.toISOString() ?? ""} />
      {submitError && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/50 dark:text-red-200">
          {submitError}
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="toEmail" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
          To
        </label>
        <input
          id="toEmail"
          name="toEmail"
          type="email"
          required
          placeholder="recipient@example.com"
          className={inputClassName}
        />
        {errors?.toEmail && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.toEmail}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Email subject"
          className={inputClassName}
        />
        {errors?.subject && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="body" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
          Body
        </label>
        <textarea
          id="body"
          name="body"
          required
          placeholder="Email body..."
          rows={4}
          className={textareaClassName}
        />
        {errors?.body && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.body}</p>
        )}
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-zinc-950 dark:text-zinc-50">
          Send at
        </label>
        <DateTimePicker value={sendAt} onChange={setSendAt} datePlaceholder="Pick date" />
        {errors?.sendAt && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.sendAt}</p>
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 px-4 text-sm font-medium hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:focus:ring-zinc-50"
          >
            Cancel
          </button>
        </DialogClose>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus:ring-zinc-50"
        >
          {isPending ? "Scheduling..." : "Schedule"}
        </button>
      </DialogFooter>
    </form>
  );
}
