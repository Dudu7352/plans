import { useEffect, useState } from "react";
import "./Planner.css";
import PlannerBar from "../planner_bar/PlannerBar";
import { DayDetails } from "../../utils/interfaces";
import { invoke } from "@tauri-apps/api";
import { DEFAULT_DATE } from "../../utils/consts";
import EventPrompt from "../event_prompt/EventPrompt";

interface PlannerProps {
  week: number;
  userYear: number;
}

export default function Planner(props: PlannerProps) {
  let [weekDetails, setWeekDetails] = useState([] as DayDetails[]);

  let [promptOpened, setPromptOpened] = useState(false);

  useEffect(() => {
    console.log(props.userYear);
    invoke("get_week_details", { year: props.userYear, week: props.week }).then(
      (msg) => {
        setWeekDetails(msg as DayDetails[]);
      }
    );
  }, [props.userYear, props.week]);

  return (
    <div className="Planner box">
      <div className="Editor root-box bordered">
        <PlannerBar
          weekStart={
            weekDetails.length 
              ? new Date(weekDetails[0].date) 
              : DEFAULT_DATE
          }
          weekEnd={
            weekDetails.length
              ? new Date(weekDetails[weekDetails.length-1].date)
              : DEFAULT_DATE
          }
          showEventPropmt={() => {
            setPromptOpened((promptOpened) => !promptOpened);
          }}
        />
        <p>Events: </p>
      </div>
      <EventPrompt
        isOpened={promptOpened}
        close={() => {
          setPromptOpened(false);
        }}
      />
    </div>
  );
}
