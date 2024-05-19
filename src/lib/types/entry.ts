import type { Time } from "./time";

export type Entry = Activity | Deadline;

export interface Activity {
  id: string;
  type: "activity";
  from: Date;
  until: Date;
}

export interface Deadline {
  id: string;
  type: "deadline";
  until: Date;
  accomplished: boolean;
}