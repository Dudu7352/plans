import { useEffect, useState } from "react";
import "./Planner.css";
import PlannerBar from "./planner_bar/PlannerBar";
import { DayDetails } from "../utils";
import { invoke } from "@tauri-apps/api";
import { DEFAULT_DATE } from "../consts";

interface PlannerProps {
  week: number,
  userYear: number,
}

export default function Planner(props: PlannerProps) {

  let [weekDetails, setWeekDetails] = useState([] as DayDetails[]);

  useEffect(() => {
    invoke('get_week_details', {year: props.userYear, week: props.week}).then(msg => {
      setWeekDetails(msg as DayDetails[]);
    });
  }, [props.userYear, props.week]);

  return (
    <div className="Planner box">
      <div className="Editor root-box bordered">
        <PlannerBar 
          weekStart = {new Date(weekDetails.at(0)?.date || DEFAULT_DATE)}
          weekEnd = {new Date(weekDetails.at(-1)?.date || DEFAULT_DATE)}
          showEventPropmt={() => {}}
        />
        <p>Events: </p>
      </div>
      
    </div>
  );
}
