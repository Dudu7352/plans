import type IMonthDetails from "./IMonthDetails";

export default interface IYearDetails {
  year: number;
  monthDetailsList: IMonthDetails[];
  isLeap: boolean;
}
