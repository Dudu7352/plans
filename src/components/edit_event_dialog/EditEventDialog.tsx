import { start } from "repl";
import { Time } from "../../utils/classes";
import { formatDate } from "../../utils/functions";
import { EventDetails } from "../../utils/interfaces";
import Button from "../button/Button";
import ControlBar, { ControlOption } from "../control_bar/ControlBar";
import Dialog from "../dialog/Dialog";
import { invoke } from "@tauri-apps/api";

interface EditEventDialogProps {
  eventDetails: EventDetails;
  isOpened: boolean;
  close: (refresh: boolean) => void;
}

export default function EditEventDialog(props: EditEventDialogProps) {
  const date = new Date(props.eventDetails.date_time);
  const startTime: Time = Time.fromDate(date);
  const endTime = startTime.copy();

  endTime.addMinutes(Math.floor(props.eventDetails.duration_seconds));

  return (
    <Dialog
      isOpened={props.isOpened}
      title={`Edit event "${props.eventDetails.name}"`}
    >
      <table>
        <tbody>
          <tr>
            <td>Date:</td>
            <td>{formatDate(new Date(props.eventDetails.date_time * 1000))}</td>
          </tr>
          <tr>
            <td>Start: </td>
            <td>{startTime.toString()}</td>
          </tr>
          <tr>
            <td>Duration: </td>
            <td>{`${props.eventDetails.duration_seconds} seconds`}</td>
          </tr>
          <tr>
            <td>End: </td>
            <td>{endTime.toString()}</td>
          </tr>
        </tbody>
      </table>
      <ControlBar
        controlOptionList={[ControlOption.CANCEL, ControlOption.DELETE]}
        onInput={(actionType: ControlOption) => {
          switch (actionType) {
            case ControlOption.CANCEL:
              props.close(false);
              break;
            case ControlOption.DELETE:
              invoke("try_delete_event", { event: props.eventDetails }).then(
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
