import { Time } from "./classes";

export interface IEventInputData {
  name: string;
  start: Time;
  end: Time;
}

export interface IEventDetails {
  dateTime: number;
  durationMinutes: number | undefined;
  name: string;
}

export interface IDayDetails {
  date: Date;
  events: IEventDetails[];
}

export interface IMonthDetails {
  beginningWeekday: number;
  monthLength: number;
}

export interface IYearDetails {
  year: number;
  IMonthDetailsList: IMonthDetails[];
  isLeap: boolean;
}
