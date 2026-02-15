"use server";

import { scheduleEmail as scheduleEmailApi } from "@/lib/api-server";
import { scheduleEmailSchema } from "@/lib/schemas";
import type { ScheduleEmailInput } from "@/lib/schemas";

export type ScheduleEmailState =
  | { success: true }
  | { success: false; error?: string; errors?: Partial<Record<keyof ScheduleEmailInput, string>> };

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function scheduleEmailAction(
  _prevState: ScheduleEmailState | null,
  formData: FormData
): Promise<ScheduleEmailState> {
  const payload = {
    toEmail: getString(formData, "toEmail"),
    subject: getString(formData, "subject"),
    body: getString(formData, "body"),
    sendAt: getString(formData, "sendAt"),
  };

  const result = scheduleEmailSchema.safeParse(payload);
  if (!result.success) {
    const errors: Partial<Record<keyof ScheduleEmailInput, string>> = {};
    result.error.issues.forEach((err) => {
      const path = err.path[0] as keyof ScheduleEmailInput;
      if (path && !errors[path]) {
        errors[path] = err.message;
      }
    });
    return { success: false, errors };
  }

  try {
    await scheduleEmailApi(result.data);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to schedule email",
    };
  }
}
