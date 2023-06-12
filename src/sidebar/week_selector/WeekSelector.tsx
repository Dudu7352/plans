import "./WeekSelector.css";
import { MonthDetails } from "../../utils";
import { Dispatch, SetStateAction } from "react";
import { YEAR_WEEKS } from "../../consts";
import Week from "./week/Week";

interface WeekSelectorProps {
  monthDetails: MonthDetails[];
  setWeek: Dispatch<SetStateAction<number>>;
}

export default function WeekSelector(props: WeekSelectorProps) {
  if (props.monthDetails.length == 0)
    return <div className="WeekSelector"></div>;

  let daysToMonth: number = props.monthDetails[0].weekDayBeginning;
  let month: number = -1;
  return (
    <div className="WeekSelector">
      {[...Array(YEAR_WEEKS)].map((_, i) => {
        if (i * 7 + 1 > daysToMonth)
          daysToMonth += props.monthDetails[++month].length;

        return <Week key={i} weekId={i} nextMonth={31} />;
      })}
    </div>
  );
}
