import { Time } from "./classes";

export interface EventInputData {
  name: string;
  start: Time;
  end: Time;
}

export interface EventDetails {
  dateTime: number;
  durationSeconds: number;
  name: string;
}

export interface DayDetails {
  date: Date;
  events: EventDetails[];
}

export interface MonthDetails {
  beginningWeekday: number;
  monthLength: number;
}

export interface YearDetails {
  year: number;
  monthDetailsList: MonthDetails[];
  isLeap: boolean;
}
