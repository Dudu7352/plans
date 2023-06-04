import { invoke } from "@tauri-apps/api/tauri";
import Week from "./Week/Week";
import "./WeekSelector.css";
import { MONTHS, YEAR_WEEKS } from "../../consts";

interface WeekSelectorProps {
  year: number;
}

export default function WeekSelector(props: WeekSelectorProps) {

  

  return (
    <div className="WeekSelector">
      {Array.from(Array(12).keys()).map((month, i) => {
        return null;
      })}
    </div>
  );
}
