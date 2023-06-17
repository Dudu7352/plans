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
        if(monthDay+6 >= nextMonth && month < 11)
          month++;

        const slice = (
          month === -1 ? 
          [nextMonth, 7] : 
          weekId+1 === YEAR_WEEKS ? [0, monthDay] : [0, 7]
        );
        
        const jsx: React.JSX.Element = (
          <Week
            key={weekId} 
            weekId={weekId}
            slice={[0, 7]}
            monthDay={monthDay}
            monthChange={nextMonth}
            month={month}
          />
        );

        if(monthDay+6 >= nextMonth && month < 11) {
          monthDay -= nextMonth;
          nextMonth = props.monthDetails[month].month_length;
        }
        
        monthDay += 7;

        return jsx;
      })}
    </div>
  );
}
