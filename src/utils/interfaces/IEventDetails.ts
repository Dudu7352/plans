import IDeadlineDetails from "./IDeadlineDetails";

export default interface IEventDetails extends IDeadlineDetails {
  durationMinutes: number;
}
