import moment from "moment";
import type { DateRange } from "../types/datetime";

const commonFormats = [
  moment.ISO_8601,
  "YYYY-MM-DD",
  "DD/MM/YYYY",
  "MM/DD/YYYY",
  "DD.MM.YYYY",
];

export const parseDate = (dateStr: string): Date => {
  const trimmed = dateStr.trim();

  if (!trimmed || trimmed.toLowerCase() === "null") {
    return new Date();
  }

  const m = moment(trimmed, commonFormats, true);

  if (m.isValid()) {
    return m.toDate();
  }

  const m2 = moment(trimmed);

  if (m2.isValid()) {
    return m2.toDate();
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
