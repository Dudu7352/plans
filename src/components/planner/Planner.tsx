import { useEffect, useState } from "react";
import "./Planner.css";
import PlannerBar from "../planner_bar/PlannerBar";
import { IDayDetails, IEventType } from "../../utils/interfaces";
import { invoke } from "@tauri-apps/api";
import { DEFAULT_DATE, DEFAULT_EVENT_TYPE, Prompt } from "../../utils/consts";
import AddEventDialog from "../add_event_dialog/AddEventDialog";
import EventsTable from "../events_table/EventsTable";
import EditEventDialog from "../edit_event_dialog/EditEventDialog";
import Titlebar from "../titlebar/Titlebar";

interface PlannerProps {
  week: number;
  userYear: number;
  toggleTheme: () => void;
}

export default function Planner(props: PlannerProps) {
  let [weekDetails, setWeekDetails] = useState([] as IDayDetails[]);
  let [firstWeekday, setFirstWeekday] = useState(0);
  let [promptOpened, setPromptOpened] = useState(Prompt.NONE);
  let [date, setDate] = useState(DEFAULT_DATE);
  let [eventType, setEventType] = useState(DEFAULT_EVENT_TYPE);

  function refreshDetails() {
    invoke("get_week_details", { year: props.userYear, week: props.week }).then(
      (msg) => {
        setWeekDetails(msg as IDayDetails[]);
      }
    );
  }

  useEffect(refreshDetails, [props.userYear, props.week]);

  useEffect(() => {
    invoke("get_first_weekday", { year: props.userYear }).then((msg) => {
      setFirstWeekday(msg as number);
    });
  }, [props.userYear]);

  return (
    <div className="Planner">
      <div className="editor">
        <PlannerBar
          weekStart={
            weekDetails.length ? new Date(weekDetails[0].date) : DEFAULT_DATE
          }
          weekEnd={
            weekDetails.length
              ? new Date(weekDetails[weekDetails.length - 1].date)
              : DEFAULT_DATE
          }
          toggleTheme={props.toggleTheme}
        />
        <EventsTable
          weekDetails={weekDetails}
          emptyCols={props.week === 0 ? firstWeekday : 0}
          showAddEventDialog={(date: Date) => {
            setDate(date);
            setPromptOpened(Prompt.ADD);
          }}
          showEditEventDialog={(eventType: IEventType) => {
            setEventType(eventType);
            setPromptOpened(Prompt.EDIT);
          }}
        />
      </div>
      <AddEventDialog
        date={date}
        isOpened={promptOpened === Prompt.ADD}
        close={(refresh: boolean) => {
          setPromptOpened(Prompt.NONE);
          if (refresh) refreshDetails();
        }}
      />
      <EditEventDialog
        eventType={eventType}
        isOpened={promptOpened === Prompt.EDIT}
        close={(refresh: boolean) => {
          setPromptOpened(Prompt.NONE);
          if (refresh) refreshDetails();
        }}
      />
    </div>
  );
}
