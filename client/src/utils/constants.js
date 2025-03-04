import { DateTime } from "luxon";

export const HOMEPAGE_ROUTES = [
  { label: "home", path: "/" },
  { label: "contact", path: "/contact" },
  { label: "about", path: "/about" },
];

export const APP_ROUTES = {
  ADMIN: ["overview", "sheep", "users", "shipments", "categories", "sales"],
  FARMER: ["overview", "sheep", "categories", "sales"],
  SHIPPER: ["overview", "shipments"],
  USER: ["overview", "sheep"],
};

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

//OAUth2
export const OAuthProviders = {
  GOOGLE: "oauth2/code/google",
  GITHUB: "oauth2/code/github",
  FACEBOOK: "oauth2/code/facebook",
};

//Validation rules
export const RULES = {
  username: {
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers, and underscores",
    },
  },
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Invalid email address",
    },
  },
  phone: {
    pattern: {
      value: /^(\+212\s?0?|0)(5|6|7)\d{8}$/,
      message:
        "Invalid phone number format. \n Ex: +212 0637814207 or 0637814207",
    },
  },
  password: {
    pattern: {
      value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/,
      message:
        "Password must contain at least 8 characters, one letter (either uppercase or lowercase), and one number",
    },
  },
  passwordConfirmation: {
    validate: (value, getValue) =>
      value === getValue("password") || "Passwords do not match",
  },
};
