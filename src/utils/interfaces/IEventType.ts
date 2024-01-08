import { NoId } from "../NoId";
import IDeadlineDetails from "./IDeadlineDetails";
import IEventDetails from "./IEventDetails";

export default interface NewEntry {
    Event?: NoId<IEventDetails> | undefined,
    Deadline?: NoId<IDeadlineDetails> | undefined
}

export interface Entry {
    Event?: IEventDetails | undefined,
    Deadline?: IDeadlineDetails | undefined
}