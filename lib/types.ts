import type { ScheduleEmailInput } from "@/lib/schemas";

export type ScheduleEmailState =
  | { success: true }
  | {
      success: false;
      error?: string;
      errors?: Partial<Record<keyof ScheduleEmailInput, string>>;
    };
