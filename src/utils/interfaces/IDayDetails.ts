import IEventDetails from "./IEventDetails";

export default interface IDayDetails {
  date: Date;
  events: IEventDetails[];
}
