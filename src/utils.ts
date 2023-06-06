export interface MonthDetails {
    weekDayBeginning: number;
    length: number;
    weekName: string;
}

export interface YearDetails {
    monthDetailsList: MonthDetails[];
    isLeap: boolean;
}