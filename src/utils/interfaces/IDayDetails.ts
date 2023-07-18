import IEventType from "./IEventType";

export default interface IDayDetails {
  date: Date;
  events: IEventType[];
}
