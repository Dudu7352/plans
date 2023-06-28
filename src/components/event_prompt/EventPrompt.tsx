import { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api";
import "./EventPrompt.css";
import Button from "../../components/button/Button";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import EventInput from "../event_input/EventInput";
import { EventDetails, EventInputData } from "../../utils/interfaces";
import { formatDate } from "../../utils/functions";
import { DEFAULT_TIME } from "../../utils/consts";
import { Time } from "../../utils/classes";

interface EventPromptProps {
  date: Date;
  isOpened: boolean;
  close: () => void;
}

export default function EventPrompt(props: EventPromptProps) {
  let ref = useRef<HTMLDialogElement>(null);
  let [inputData, setInputData] = useState({
    name: "",
    start: DEFAULT_TIME,
    end: DEFAULT_TIME,
  } as EventInputData);

  useEffect(() => {
    if (props.isOpened && !ref.current?.hidden) ref.current?.showModal();
    else ref.current?.close();
  }, [props.isOpened]);

  const dateFormat: string = formatDate(new Date(props.date));

  return (
    <dialog className="root-box bordered" ref={ref}>
      <TopBar size={TopBarSize.FIT} float={TopBarFloat.LEFT} rounded={true}>
        <h3>Add new event for {dateFormat}</h3>
      </TopBar>

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
    </dialog>
  );
}
