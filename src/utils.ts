export interface EventDetails {
    date_time: Date,
    duration_seconds: number,
    name: string
}

export interface DayDetails {
    date: Date,
    events: EventDetails[]
}

export interface MonthDetails {
    beginning_weekday: number;
    month_length: number;
}

export interface YearDetails {
    year: number;
    month_details_list: MonthDetails[];
    isLeap: boolean;
}