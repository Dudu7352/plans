import { type NoId } from "../types/NoId";
import type IDeadlineDetails from "./IDeadlineDetails";
import type IEventDetails from "./IEventDetails";

export default interface NewEntry {
    Event?: NoId<IEventDetails> | undefined,
    Deadline?: NoId<IDeadlineDetails> | undefined
}

export interface Entry {
    Event?: IEventDetails | undefined,
    Deadline?: IDeadlineDetails | undefined
}