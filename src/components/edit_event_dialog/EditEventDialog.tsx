import { Time } from "../../utils/classes";
import { formatDate } from "../../utils/functions";
import { Entry } from "../../utils/interfaces";
import ControlBar, { ControlOption } from "../control_bar/ControlBar";
import Dialog from "../dialog/Dialog";
import { invoke } from "@tauri-apps/api";
import "./EditEventDialog.css";

interface EditEventDialogProps {
  eventType: Entry;
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
  if (props.eventType.Event) {
    const event = props.eventType.Event;
    const date = new Date(event.dateStart * 1000);
    const startTime: Time = Time.fromDate(date);
    const endTime: Time = Time.fromDate(new Date(event.dateEnd * 1000));
    const duration = (props.eventType.Event.dateEnd - props.eventType.Event.dateStart) / 60;
    name = event.eventName;
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
          <td>{`${duration} minutes`}</td>
        </tr>
        <tr>
          <td>End: </td>
          <td>{endTime.toString()}</td>
        </tr>
      </tbody>
    );
  } else if (props.eventType.Deadline) {
    const deadline = props.eventType.Deadline;
    const date = new Date(deadline.dateUntil * 1000);
    const time = Time.fromDate(date);
    name = deadline.deadlineName;
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
              invoke<string | null>("try_delete_event", { event: props.eventType }).then(
                (msg) => {
                  if (msg === null) props.close(true);
                  else alert(`Could not delete the event: ${msg}`);
                }
              );
              break;
          }
        }}
      />
    </Dialog>
  );
}
