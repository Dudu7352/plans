import { useState } from "react";
import { invoke } from "@tauri-apps/api";
import EventInput from "../event_input/EventInput";
import { EventDetails, EventInputData } from "../../utils/interfaces";
import { formatDate } from "../../utils/functions";
import { DEFAULT_TIME } from "../../utils/consts";
import { Time } from "../../utils/classes";
import Dialog from "../dialog/Dialog";
import ControlBar, { ControlOption } from "../control_bar/ControlBar";

interface AddEventDialogProps {
  date: Date;
  isOpened: boolean;
  close: (refresh: boolean) => void;
}

export default function AddEventDialog(props: AddEventDialogProps) {
  let [inputData, setInputData] = useState({
    name: "",
    start: DEFAULT_TIME,
    end: DEFAULT_TIME,
  } as EventInputData);

  const dateFormat: string = formatDate(new Date(props.date));

  return (
    <Dialog
      isOpened={props.isOpened}
      title={`Add new event for ${dateFormat}`}
      closeDialog={() => {
        props.close(false);
      }}
    >
      <EventInput
        inputData={inputData}
        updateEventDetails={(inputData: EventInputData) => {
          setInputData(inputData);
        }}
      />

      <ControlBar
        controlOptionList={[ControlOption.CANCEL, ControlOption.ADD]}
        onInput={(actionType) => {
          switch (actionType) {
            case ControlOption.ADD: {
              const startDate = new Date(props.date);
              startDate.setHours(inputData.start.getHour());
              startDate.setMinutes(inputData.start.getMinute());
              const duration = Time.durationSeconds(
                inputData.end,
                inputData.start
              );
              let newEvent = {
                dateTime: Math.floor(startDate.getTime() / 1000),
                durationSeconds: duration,
                name: inputData.name,
              } as EventDetails;
              invoke("try_add_event", { event: newEvent }).then((msg) => {
                const result = msg as boolean;
                if (result) props.close(true);
                else alert("Could not add the event");
              });
              break;
            }
            case ControlOption.CANCEL: {
              props.close(false);
              break;
            }
          }
        }}
      />
    </Dialog>
  );
}
