import type { ScheduleEmailInput } from "@/lib/schemas";

export type ListedEmail = {
  id: string;
  subject: string;
  status: string;
  toEmail: string;
  sendAt: string;
  sentAt: string | null;
  createdAt: string;
};

export type ScheduleEmailState =
  | { success: true }
  | {
      success: false;
      error?: string;
      errors?: Partial<Record<keyof ScheduleEmailInput, string>>;
    };
