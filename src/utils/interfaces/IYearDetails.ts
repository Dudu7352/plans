import IMonthDetails from "./IMonthDetails";

export default interface IYearDetails {
  year: number;
  monthDetailsList: IMonthDetails[];
  isLeap: boolean;
}
