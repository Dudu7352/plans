import { Time } from "./classes";
import { IEventDetails, Entry } from "./interfaces";

export const MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octover",
  "November",
  "December",
];

export const WEEKDAYS: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export enum Prompt {
  NONE,
  ADD,
  EDIT,
}

export const YEAR_WEEKS = 53;
export const YEAR_DAYS = 365;
export const LEAP_YEAR_DAYS = 366;

export const DEFAULT_DATE: Date = new Date("2000-01-01");
export const DEFAULT_TIME: Time = new Time("00:00");
export const DEFAULT_EVENT: IEventDetails = {
  calendarEntryId: "",
  dateStart: Math.floor(DEFAULT_DATE.getTime() / 1000),
  dateEnd: Math.floor(DEFAULT_DATE.getTime() / 1000 + 1),
  color: "#ff0000",
  eventName: "",
};
export const DEFAULT_EVENT_TYPE: Entry = {
  Event: undefined,
  Deadline: undefined,
};

export const SHADE_DOWN = 0.9;
export const SHADE_UP = 1.1;