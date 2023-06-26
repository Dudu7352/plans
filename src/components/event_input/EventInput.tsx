import { EventDetails } from "../../utils/interfaces";
import "./EventInput.css"

interface EventInputProps {
  eventDetails: EventDetails;
  updateEventDetails: (eventDetails: EventDetails) => void;
}

export default function EventInput(props: EventInputProps) {
  return (
    <table className="EventInput">
      <tr>
        <td>Event name: </td>
        <td><input type="text" className="selectable bordered" onChange={
          event => {
            const newStart = new Date(event.target.value)
            const newEventDetails = {} as EventDetails;
            props.updateEventDetails(newEventDetails);
          }
        }/></td>
      </tr>
      <tr>
        <td>Start:</td>
        <td><input type="time" className="selectable bordered" /></td>
      </tr>
      <tr>
        <td>End:</td>
        <td><input type="time" className="selectable bordered" /></td>
      </tr>
    </table>
  );
}
