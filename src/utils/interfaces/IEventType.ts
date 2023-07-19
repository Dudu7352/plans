import IDeadlineDetails from "./IDeadlineDetails";
import IEventDetails from "./IEventDetails";

export default interface IEventType {
    EVENT: IEventDetails | undefined,
    DEADLINE: IDeadlineDetails | undefined
}