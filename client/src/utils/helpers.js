import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { DateTime, Interval } from "luxon";
import { intervals } from "./constants";

export const cn = (...inputs) => twMerge(clsx(inputs));

export const changeTitle = (title) => (document.title = title || "Loading...");

//*------ Dates And Time
export const getIsoDate = (date) =>
  DateTime.fromISO(new Date(date).toISOString());

export const formatDate = (date, includeTime) => {
  if (!date) return null;
  return getIsoDate(date).toLocaleString(
    includeTime ? DateTime.DATETIME_MED : DateTime.DATE_FULL
  );
};

export const checkDateInIntervals = (date, dateInterval) => {
  const interval = intervals.find((d) => d.name === dateInterval).interval;
  return Interval.fromDateTimes(interval.start, interval.end).contains(
    getIsoDate(date)
  );
};
export const getTimelineDates = (startDate, endDate) => {
  const today = DateTime.fromISO(DateTime.now().toISO()).startOf("day");
  const start = DateTime.fromISO(startDate).startOf("day");
  const end = DateTime.fromISO(endDate).startOf("day");

  const currentDay = Math.ceil(today.diff(start, "days").toObject().days);
  const duration = Math.ceil(end.diff(start, "days").toObject().days);
  const daysLeft = Math.floor(end.diff(today, "days").toObject().days);
  const daysToStart = Math.ceil(start.diff(today, "days").toObject().days);
  const isOverdue = daysLeft < 0;

  return { currentDay, duration, daysLeft, daysToStart, isOverdue };
};

export const getRelativeTime = (date) => {
  if (!date) return null;
  const now = getIsoDate(new Date());
  const isoDate = getIsoDate(date);

  const get = (type) =>
    Math.abs(Math.ceil(isoDate.diff(now, type).toObject()[type]));

  const seconds = get("seconds");
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = get("minutes");
  if (minutes < 60) return `${minutes} min ago`;

  const hours = get("hours");
  if (hours < 24) return `${hours}h ago`;

  const days = get("days");
  if (days < 7) return `${days}d ago`;

  const weeks = get("weeks");
  if (weeks < 4) return `${weeks}w ago`;

  const months = get("months");
  if (months < 12) return `${months} mo ago`;

  const years = get("years");
  return `${years}y ago`;
};
