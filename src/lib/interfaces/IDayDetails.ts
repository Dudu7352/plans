import { type Entry } from "./IEventType";

export default interface IDayDetails {
  date: Date;
  events: Entry[];
}
