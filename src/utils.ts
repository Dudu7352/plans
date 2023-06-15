export interface MonthDetails {
    beginning_weekday: number;
    length: number;
}

export interface YearDetails {
    year: number;
    month_details_list: MonthDetails[];
    isLeap: boolean;
}