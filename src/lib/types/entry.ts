export type Entry = Activity | Deadline;

export interface Activity {
  id: string;
  name: string;
  type: "activity";
  from: Date;
  until: Date;
  color?: string;
}

export interface Deadline {
  id: string;
  name: string;
  type: "deadline";
  until: Date;
  accomplished: boolean;
  color?: string;
}
