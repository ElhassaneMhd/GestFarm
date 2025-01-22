
import { DateTime } from "luxon";

export const HOMEPAGE_ROUTES = [
  { label: "home", path: "/" },
  { label: "contact", path: "/contact" },
  { label: "about", path: "/about" },
];

export const PAGE_LIMIT = 10;

//date and time
export const intervals = [
  {
    name: "Yesterday",
    interval: {
      start: DateTime.local().minus({ days: 1 }).startOf("day"),
      end: DateTime.local().minus({ days: 1 }).endOf("day"),
    },
    time: "past",
  },
  {
    name: "Today",
    interval: {
      start: DateTime.local().startOf("day"),
      end: DateTime.local().endOf("day"),
    },
    time: "present",
  },
  {
    name: "Tomorrow",
    interval: {
      start: DateTime.local().plus({ days: 1 }).startOf("day"),
      end: DateTime.local().plus({ days: 1 }).endOf("day"),
    },
    time: "future",
  },
  {
    name: "Last 7 Days",
    interval: {
      start: DateTime.local().minus({ days: 7 }).startOf("day"),
      end: DateTime.local().startOf("day").minus({ milliseconds: 1 }),
    },
    time: "past",
  },
  {
    name: "This Week",
    interval: {
      start: DateTime.local().startOf("week"),
      end: DateTime.local().endOf("week"),
    },
    time: "present",
  },
  {
    name: "Next Week",
    interval: {
      start: DateTime.local().plus({ weeks: 1 }).startOf("week"),
      end: DateTime.local().plus({ weeks: 1 }).endOf("week"),
    },
    time: "future",
  },
  {
    name: "Last 30 Days",
    interval: {
      start: DateTime.local().minus({ days: 30 }).startOf("day"),
      end: DateTime.local().startOf("day").minus({ milliseconds: 1 }),
    },
    time: "past",
  },
  {
    name: "This Month",
    interval: {
      start: DateTime.local().startOf("month"),
      end: DateTime.local().endOf("month"),
    },
    time: "present",
  },
  {
    name: "Next Month",
    interval: {
      start: DateTime.local().plus({ months: 1 }).startOf("month"),
      end: DateTime.local().plus({ months: 1 }).endOf("month"),
    },
    time: "future",
  },
  {
    name: "Last 90 Days",
    interval: {
      start: DateTime.local().minus({ days: 90 }).startOf("day"),
      end: DateTime.local().startOf("day").minus({ milliseconds: 1 }),
    },
    time: "past",
  },
  {
    name: "Last 6 Months",
    interval: {
      start: DateTime.local().minus({ months: 6 }).startOf("month"),
      end: DateTime.local().startOf("month").minus({ milliseconds: 1 }),
    },
    time: "past",
  },
  {
    name: "This Year",
    interval: {
      start: DateTime.local().startOf("year"),
      end: DateTime.local().endOf("year"),
    },
    time: "present",
  },
  {
    name: "Next Year",
    interval: {
      start: DateTime.local().plus({ years: 1 }).startOf("year"),
      end: DateTime.local().plus({ years: 1 }).endOf("year"),
    },
    time: "future",
  },
  {
    name: "Last Year",
    interval: {
      start: DateTime.local().minus({ years: 1 }).startOf("year"),
      end: DateTime.local().startOf("year").minus({ milliseconds: 1 }),
    },
    time: "past",
  },
];