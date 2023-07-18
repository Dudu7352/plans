import { Time } from "./classes";
import { IEventDetails } from "./interfaces";

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
  EDIT
}

export const YEAR_WEEKS = 53;
export const YEAR_DAYS = 365;
export const LEAP_YEAR_DAYS = 366;

export const DEFAULT_DATE: Date = new Date("2000-01-01");
export const DEFAULT_TIME: Time = new Time("00:00");
export const DEFAULT_EVENT: IEventDetails = {
  dateTime: Math.floor(DEFAULT_DATE.getTime() / 1000),
  durationMinutes: 0,
  name: ""
};