import { Time } from "../../utils/classes";
import { formatDate } from "../../utils/functions";
import { IEventType } from "../../utils/interfaces";
import ControlBar, { ControlOption } from "../control_bar/ControlBar";
import Dialog from "../dialog/Dialog";
import { invoke } from "@tauri-apps/api";
import "./EditEventDialog.css";

interface EditEventDialogProps {
  eventType: IEventType;
  isOpened: boolean;
  close: (refresh: boolean) => void;
}

export default function EditEventDialog(props: EditEventDialogProps) {
  let tableData = (
    <tbody>
      <tr>
        <td>Nothing to show</td>
      </tr>
    </tbody>
  );
  let name = "undefined event";
  if (props.eventType.EVENT) {
    const event = props.eventType.EVENT;
    const date = new Date(event.dateTime * 1000);
    const startTime: Time = Time.fromDate(date);
    const endTime = startTime.copy();
    endTime.addMinutes(Math.floor(event.durationMinutes));
    name = event.name;
    tableData = (
      <tbody>
        <tr>
          <td>Date:</td>
          <td>{formatDate(date)}</td>
        </tr>
        <tr>
          <td>Start: </td>
          <td>{startTime.toString()}</td>
        </tr>
        <tr>
          <td>Duration: </td>
          <td>{`${event.durationMinutes} minutes`}</td>
        </tr>
        <tr>
          <td>End: </td>
          <td>{endTime.toString()}</td>
        </tr>
      </tbody>
    );
  } else if (props.eventType.DEADLINE) {
    const deadline = props.eventType.DEADLINE;
    const date = new Date(deadline.dateTime * 1000);
    const time = Time.fromDate(date);
    name = deadline.name;
    tableData = (
      <tbody>
        <tr>
          <td>Date:</td>
          <td>{formatDate(date)}</td>
        </tr>
        <tr>
          <td>Time until: </td>
          <td>{time.toString()}</td>
        </tr>
      </tbody>
    );
  }

  return (
    <Dialog
      isOpened={props.isOpened}
      title={`Edit event "${name}"`}
      closeDialog={() => {
        props.close(false);
      }}
      className={"EditEventDialog"}
    >
      <table>{tableData}</table>
      <ControlBar
        controlOptionList={[ControlOption.CANCEL, ControlOption.DELETE]}
        onInput={(actionType: ControlOption) => {
          switch (actionType) {
            case ControlOption.CANCEL:
              props.close(false);
              break;
            case ControlOption.DELETE:
              invoke("try_delete_event", { event: props.eventType }).then(
                (msg) => {
                  const result = msg as boolean;
                  if (result) props.close(true);
                  else alert("Could not delete the event");
                }
              );
              break;
          }
        }}
      />
    </Dialog>
  );
}
