import { useState } from "react";
import { invoke } from "@tauri-apps/api";
import EventInput from "../event_input/EventInput";
import { IEventInputData, NewEntry } from "../../utils/interfaces";
import { formatDate } from "../../utils/functions";
import { DEFAULT_TIME } from "../../utils/consts";
import { Time } from "../../utils/classes";
import Dialog from "../dialog/Dialog";
import ControlBar, { ControlOption } from "../control_bar/ControlBar";

interface AddEventDialogProps {
  date: Date;
  isOpened: boolean;
  templateColors: string[];
  close: (refresh: boolean) => void;
}

export default function AddEventDialog(props: AddEventDialogProps) {
  let [inputData, setInputData] = useState({
    name: "",
    color: "#808080",
    start: DEFAULT_TIME,
    end: DEFAULT_TIME,
  } as IEventInputData);

  const dateFormat: string = formatDate(new Date(props.date));

  return (
    <Dialog
      isOpened={props.isOpened}
      title={`Add new event for ${dateFormat}`}
      closeDialog={() => {
        props.close(false);
      } }>
      <EventInput
        inputData={inputData}
        templateColors={props.templateColors}
        updateIEventInputData={(inputData: IEventInputData) => {
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
              const duration = Time.durationMinutes(
                inputData.end,
                inputData.start
              );
              const endDate = new Date(startDate.getTime() + duration * 60000);
              let newEvent: NewEntry =
                duration === 0
                  ? {
                      Deadline: {
                        dateUntil: Math.floor(startDate.getTime() / 1000),
                        deadlineName: inputData.name,
                        color: inputData.color,
                      },
                    }
                  : {
                      Event: {
                        dateStart: Math.floor(startDate.getTime() / 1000),
                        dateEnd: Math.floor(endDate.getTime() / 1000),
                        eventName: inputData.name,
                        color: inputData.color,
                      },
                    };
              console.log(newEvent);
              invoke("try_add_event", { event: newEvent }).then(() => {
                props.close(true);
              }).catch((err) => {
                alert(err);
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
