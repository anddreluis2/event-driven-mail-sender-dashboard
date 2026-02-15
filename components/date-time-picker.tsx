"use client";

import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-time-picker.css";

type DateTimePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  datePlaceholder?: string;
  disabled?: boolean;
};

const baseInputStyles =
  "h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-50";

const DateTrigger = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void; placeholder?: string; disabled?: boolean }
>(({ value, onClick, placeholder, disabled }, ref) => (
  <button
    ref={ref}
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={`flex items-center ${baseInputStyles}`}
  >
    <span className={value ? "text-zinc-950 dark:text-zinc-50" : "text-zinc-500 dark:text-zinc-400"}>
      {value || placeholder}
    </span>
  </button>
));
DateTrigger.displayName = "DateTrigger";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function DateTimePicker({
  value,
  onChange,
  datePlaceholder = "Pick date",
  disabled,
}: DateTimePickerProps) {
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const dateValue = value ? new Date(value.getFullYear(), value.getMonth(), value.getDate()) : null;
  const timeValue = value ? `${pad(value.getHours())}:${pad(value.getMinutes())}` : "";

  const handleDateChange = (d: Date | null) => {
    if (!d) {
      onChange(undefined);
      return;
    }
    const [h, m] = value ? [value.getHours(), value.getMinutes()] : [12, 0];
    const combined = new Date(d);
    combined.setHours(h, m, 0, 0);
    onChange(combined);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target.value;
    if (!t) {
      if (dateValue) {
        const combined = new Date(dateValue);
        combined.setHours(12, 0, 0, 0);
        onChange(combined);
      } else {
        onChange(undefined);
      }
      return;
    }
    const [h, m] = t.split(":").map(Number);
    const base = dateValue ?? new Date();
    const combined = new Date(base.getFullYear(), base.getMonth(), base.getDate());
    combined.setHours(isNaN(h) ? 12 : h, isNaN(m) ? 0 : m, 0, 0);
    onChange(combined);
  };

  return (
    <div className="date-time-picker grid grid-cols-[1fr_6.5rem] gap-3">
      <div className="min-w-0">
        <DatePicker
          selected={dateValue}
          onChange={(d: Date | null) => handleDateChange(d)}
          dateFormat="MMM d, yyyy"
          placeholderText={datePlaceholder}
          disabled={disabled}
          minDate={minDate}
          customInput={<DateTrigger placeholder={datePlaceholder} disabled={disabled} />}
          className="w-full"
          calendarClassName="react-datetime-picker-calendar"
          popperClassName="react-datetime-picker-popper"
        />
      </div>
      <input
        type="time"
        value={timeValue}
        onChange={handleTimeChange}
        disabled={disabled}
        className={baseInputStyles}
      />
    </div>
  );
}
