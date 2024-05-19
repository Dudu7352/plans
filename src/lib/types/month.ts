import type { Day } from "./day";

export interface Month {
    beginning: number,
    monthId: number,
    days: Day[]
}