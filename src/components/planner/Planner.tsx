import { useEffect, useState } from "react";
import "./Planner.css";
import PlannerBar from "../planner_bar/PlannerBar";
import { DayDetails } from "../../utils/interfaces";
import { invoke } from "@tauri-apps/api";
import { DEFAULT_DATE } from "../../utils/consts";
import EventPrompt from "../event_prompt/EventPrompt";
import EventsTable from "../events_table/EventsTable";

interface PlannerProps {
  week: number;
  userYear: number;
}

export default function Planner(props: PlannerProps) {
  let [weekDetails, setWeekDetails] = useState([] as DayDetails[]);
  let [firstWeekday, setFirstWeekday] = useState(0);
  let [promptOpened, setPromptOpened] = useState(false);

  useEffect(() => {
    console.log(props.userYear);
    invoke("get_week_details", { year: props.userYear, week: props.week }).then(
      (msg) => {
        setWeekDetails(msg as DayDetails[]);
      }
    );
  }, [props.userYear, props.week]);

  useEffect(() => {
    invoke("get_first_weekday", {year: props.userYear}).then(msg => {
      setFirstWeekday(msg as number);
    })
  }, [props.userYear]);

  return (
    <div className="Planner box">
      <div className="editor root-box bordered">
        <PlannerBar
          weekStart={
            weekDetails.length ? new Date(weekDetails[0].date) : DEFAULT_DATE
          }
          weekEnd={
            weekDetails.length
              ? new Date(weekDetails[weekDetails.length - 1].date)
              : DEFAULT_DATE
          }
        />
        <EventsTable 
          weekDetails={weekDetails} 
          emptyCols={props.week == 0 ? firstWeekday : 0 } 
          showEventPrompt={(date: Date) => {
            setPromptOpened((promptOpened) => !promptOpened);
          }}
        />
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
