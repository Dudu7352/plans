import { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api";
import "./AddEventPrompt.css";
import Button from "../button/Button";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import EventInput from "../event_input/EventInput";
import { EventDetails, EventInputData } from "../../utils/interfaces";
import { formatDate } from "../../utils/functions";
import { DEFAULT_TIME } from "../../utils/consts";
import { Time } from "../../utils/classes";
import Dialog from "../dialog/Dialog";

interface EventPromptProps {
  date: Date;
  isOpened: boolean;
  close: () => void;
}

export default function EventPrompt(props: EventPromptProps) {
  let [inputData, setInputData] = useState({
    name: "",
    start: DEFAULT_TIME,
    end: DEFAULT_TIME,
  } as EventInputData);

  const dateFormat: string = formatDate(new Date(props.date));

  return (
    <Dialog isOpened={props.isOpened} title={`Add new event for ${dateFormat}`}>
      <EventInput
        inputData={inputData}
        updateEventDetails={(inputData: EventInputData) => {
          setInputData(inputData);
        }}
      />

      <div className="control-bar">
        <Button onClick={props.close} title="Cancel" />
        <Button
          onClick={() => {
            const startDate = new Date(props.date);
            startDate.setHours(inputData.start.getHour());
            startDate.setMinutes(inputData.start.getMinute());
            const duration = Time.duration_seconds(inputData.end, inputData.start);
            let newEvent = {
              date_time: Math.floor(startDate.getTime() / 1000),
              duration_seconds: duration,
              name: inputData.name,
            } as EventDetails;
            console.log(props.date);
            invoke("try_add_event", { newEvent: newEvent }).then(console.log);
          }}
          title="Add"
        />
      </div>
    </Dialog>
  );
}
