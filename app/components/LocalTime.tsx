// components/LocalTime.tsx
"use client";

export default function LocalTime({ dateString }: { dateString: string }) {
  const date = new Date(dateString);
  return (
    <span>
      {date.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      })}
    </span>
  );
}