import "./WeekSelector.css";
import { IMonthDetails } from "../../utils/interfaces";
import { YEAR_WEEKS } from "../../utils/consts";
import Week from "../week/Week";

interface WeekSelectorProps {
  IMonthDetails: IMonthDetails[];
  setWeek: (year: number) => void;
}

export default function WeekSelector(props: WeekSelectorProps) {
  if (props.IMonthDetails === undefined || props.IMonthDetails.length == 0 || props.IMonthDetails[0] === undefined)
    return <div className="WeekSelector"></div>;

  let nextMonth: number = props.IMonthDetails[0].beginningWeekday;
  let monthDay: number = 0;
  let month: number = -1;

  return (
    <div className="WeekSelector">
      {[...Array(YEAR_WEEKS)].map((_, weekId) => {
        if(monthDay+6 >= nextMonth)
          month++;

        const slice = (
          weekId === 0 ? 
          [nextMonth, 7] : 
          month === 12 ? [0, nextMonth - monthDay] : 
          [0, 7]
        );

        const jsx: React.JSX.Element = (
          <Week
            key={weekId} 
            weekId={weekId}
            slice={slice}
            monthDay={monthDay}
            monthChange={month == 12 ? 999 : nextMonth}
            month={month}
            setWeek={() => {props.setWeek(weekId)}}
          />
        );

        if(monthDay+6 >= nextMonth && weekId+1 < YEAR_WEEKS) {
          monthDay -= nextMonth;
          nextMonth = props.IMonthDetails[month].monthLength;
        }
        
        monthDay += 7;

        return jsx;
      })}
    </div>
  );
}
