import { Time } from "../../utils/classes";
import { EventInputData } from "../../utils/interfaces";
import "./EventInput.css";

interface EventInputProps {
  inputData: EventInputData;
  updateEventDetails: (inputData: EventInputData) => void;
}

export default function EventInput(props: EventInputProps) {
  return (
    <table className="EventInput">
      <tbody>
        <tr>
          <td>Event name: </td>
          <td>
            <input
              type="text"
              className="selectable bordered"
              onChange={(event) => {
                const newInputData = Object.assign({}, props.inputData);
                newInputData.name = event.target.value;
                props.updateEventDetails(newInputData);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>Start:</td>
          <td>
            <input
              type="time"
              className="selectable bordered"
              onChange={(event) => {
                const newInputData = Object.assign({}, props.inputData);
                newInputData.start = new Time(event.target.value);
                props.updateEventDetails(newInputData);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>End:</td>
          <td>
            <input
              type="time"
              className="selectable bordered"
              onChange={(event) => {
                const newInputData = Object.assign({}, props.inputData);
                newInputData.end = new Time(event.target.value);
                props.updateEventDetails(newInputData);
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
