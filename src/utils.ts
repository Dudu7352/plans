export interface MonthDetails {
    beginning_weekday: number;
    month_length: number;
}

export interface YearDetails {
    year: number;
    month_details_list: MonthDetails[];
    isLeap: boolean;
}