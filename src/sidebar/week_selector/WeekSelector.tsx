import "./WeekSelector.css";
import { MonthDetails } from "../../utils";
import { Dispatch, SetStateAction } from "react";
import { MONTHS, YEAR_WEEKS } from "../../consts";
import Week from "./week/Week";

interface WeekSelectorProps {
  monthDetails: MonthDetails[];
  setWeek: Dispatch<SetStateAction<number>>;
}

export default function WeekSelector(props: WeekSelectorProps) {
  if (props.monthDetails === undefined || props.monthDetails.length == 0 || props.monthDetails[0] === undefined)
    return <div className="WeekSelector"></div>;

  let nextMonth: number = props.monthDetails[0].beginning_weekday;
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
          nextMonth = props.monthDetails[month].month_length;
        }
        
        monthDay += 7;

        return jsx;
      })}
    </div>
  );
}
