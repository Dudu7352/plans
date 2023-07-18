import IMonthDetails from "./IMonthDetails";

export default interface IYearDetails {
  year: number;
  IMonthDetailsList: IMonthDetails[];
  isLeap: boolean;
}
