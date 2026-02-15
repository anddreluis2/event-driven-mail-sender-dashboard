"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { scheduleEmailSchema, type ScheduleEmailInput } from "@/lib/schemas";
import { parseApiError } from "@/lib/api-error";
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleEmailInput>({
    resolver: zodResolver(scheduleEmailSchema),
    defaultValues: { toEmail: "", subject: "", body: "", sendAt: "" },
  });

  const sendAtValue = watch("sendAt");
  const dateValue = sendAtValue ? new Date(sendAtValue) : undefined;

  const onSubmit = async (data: ScheduleEmailInput) => {
    try {
      const res = await fetch("/api/emails/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(parseApiError(result, "Failed to schedule email"));
        return;
      }

      toast.success("Email scheduled successfully");
      onSuccess?.();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to schedule email"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="toEmail"
          className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
        >
          To
        </label>
        <input
          id="toEmail"
          {...register("toEmail")}
          type="email"
          placeholder="recipient@example.com"
          className={inputClassName}
        />
        {errors.toEmail && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.toEmail.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
        >
          Subject
        </label>
        <input
          id="subject"
          {...register("subject")}
          type="text"
          placeholder="Email subject"
          className={inputClassName}
        />
        {errors.subject && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.subject.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="body"
          className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
        >
          Body
        </label>
        <textarea
          id="body"
          {...register("body")}
          placeholder="Email body..."
          rows={4}
          className={textareaClassName}
        />
        {errors.body && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.body.message}
          </p>
        )}
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-zinc-950 dark:text-zinc-50">
          Send at
        </label>
        <DateTimePicker
          value={dateValue}
          onChange={(date) => {
            setValue("sendAt", date?.toISOString() ?? "");
            if (date) clearErrors("sendAt");
          }}
          datePlaceholder="Pick date"
        />
        {errors.sendAt && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.sendAt.message}
          </p>
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 px-4 text-sm font-medium transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-zinc-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:hover:scale-[1.02] dark:hover:bg-zinc-900 dark:active:scale-[0.98] dark:focus:ring-zinc-50"
          >
            Cancel
          </button>
        </DialogClose>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-zinc-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:scale-[1.02] dark:hover:bg-zinc-200 dark:active:scale-[0.98] dark:focus:ring-zinc-50"
        >
          {isSubmitting ? "Scheduling..." : "Schedule"}
        </button>
      </DialogFooter>
    </form>
  );
}
