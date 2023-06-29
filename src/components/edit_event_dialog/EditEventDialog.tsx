import { EventDetails } from "../../utils/interfaces";
import Button from "../button/Button";
import ControlBar, { ControlOption } from "../control_bar/ControlBar";
import Dialog from "../dialog/Dialog";

interface EditEventDialogProps {
  eventDetails: EventDetails;
  isOpened: boolean;
  close: () => void;
}

export default function EditEventDialog(props: EditEventDialogProps) {
  return (
    <Dialog isOpened={props.isOpened} title={"Edit event"}>
      <ControlBar
        controlOptionList={[ControlOption.CANCEL, ControlOption.DELETE]}
        onInput={(actionType: ControlOption) => {
          switch(actionType) {
            case ControlOption.CANCEL: {
              props.close();
              break;
            }
            case ControlOption.DELETE: {
              console.log("DELETE");
              // TODO: Delete event
              break;
            }
          }
        }}
      />
    </Dialog>
  );
}
