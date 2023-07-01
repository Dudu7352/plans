import { useEffect, useState } from "react";
import "./Planner.css";
import PlannerBar from "../planner_bar/PlannerBar";
import { DayDetails, EventDetails } from "../../utils/interfaces";
import { invoke } from "@tauri-apps/api";
import { DEFAULT_DATE, DEFAULT_EVENT, Prompt } from "../../utils/consts";
import AddEventDialog from "../add_event_dialog/AddEventDialog";
import EventsTable from "../events_table/EventsTable";
import EditEventDialog from "../edit_event_dialog/EditEventDialog";

interface PlannerProps {
  week: number;
  userYear: number;
}

export default function Planner(props: PlannerProps) {
  let [weekDetails, setWeekDetails] = useState([] as DayDetails[]);
  let [firstWeekday, setFirstWeekday] = useState(0);
  let [promptOpened, setPromptOpened] = useState(Prompt.NONE);
  let [date, setDate] = useState(DEFAULT_DATE);
  let [eventDetails, setEventDetails] = useState(DEFAULT_EVENT);

  function refreshDetails() {
    invoke("get_week_details", { year: props.userYear, week: props.week }).then(
      (msg) => {
        setWeekDetails(msg as DayDetails[]);
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
          emptyCols={props.week === 0 ? firstWeekday : 0}
          showAddEventDialog={(date: Date) => {
            setDate(date);
            setPromptOpened(Prompt.ADD);
          }}
          showEditEventDialog={(eventDetails: EventDetails) => {
            setEventDetails(eventDetails);
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
        eventDetails={eventDetails}
        isOpened={promptOpened === Prompt.EDIT}
        close={(refresh: boolean) => {
          setPromptOpened(Prompt.NONE);
          if (refresh) refreshDetails();
        }}
      />
    </div>
  );
}
