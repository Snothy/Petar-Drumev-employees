import { parse, isValid } from "date-fns";
import type { DateRange } from "../types/datetime";

const DATE_FORMATS = [
  "yyyy-MM-dd",
  "dd/MM/yyyy",
  "MM/dd/yyyy",
  "yyyy/MM/dd",
  "dd.MM.yyyy",
  "MMM d, yyyy",
];

export const parseDate = (dateStr: string): Date => {
  const trimmed = dateStr.trim();

  // If NULL -> default to current date
  if (!trimmed || trimmed.toLowerCase() === "null") {
    return new Date();
  }

  // Try listed formats
  for (const formatStr of DATE_FORMATS) {
    const parsed = parse(trimmed, formatStr, new Date());
    if (isValid(parsed)) {
      return parsed;
    }
  }

  // If above fails
  const fallbackDate = new Date(trimmed);

  if (isValid(fallbackDate)) {
    return fallbackDate;
  }

  return new Date();
};

export const calculateOverlapDays = (
  dateRange1: DateRange,
  dateRange2: DateRange,
): number => {
  const latestStart =
    dateRange1.start > dateRange2.start ? dateRange1.start : dateRange2.start;
  const earliestEnd =
    dateRange1.end < dateRange2.end ? dateRange1.end : dateRange2.end;

  if (latestStart > earliestEnd) {
    return 0;
  }

  const diffInMs = earliestEnd.getTime() - latestStart.getTime();
  const durationInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  // +1 to include the start and end day
  return durationInDays + 1;
};
