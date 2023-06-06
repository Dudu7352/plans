import "./WeekSelector.css";
import { MonthDetails } from "../../utils";
import { Dispatch, SetStateAction } from "react";
import { YEAR_WEEKS } from "../../consts";
import Week from "./week/Week";

interface WeekSelectorProps {
  monthDetails?: MonthDetails[],
  setWeek: Dispatch<SetStateAction<number>>;
}

export default function WeekSelector(props: {}) {
  return (
    <div className="WeekSelector">
      {
        [...Array(YEAR_WEEKS)].map((_, i) => (
          <Week key={i} weekId={i}/>
        ))
      }
    </div>
  );
}
