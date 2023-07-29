import { ChangeEvent } from "react";
import { Time } from "../../utils/classes";
import { IEventInputData } from "../../utils/interfaces";
import TableInput from "../table_input/TableInput";
import "./EventInput.css";

interface EventInputProps {
  inputData: IEventInputData;
  updateIEventDetails: (inputData: IEventInputData) => void;
}

export default function EventInput(props: EventInputProps) {
  return (
    <table className="EventInput">
      <tbody>
        <TableInput
          label={"Event name: "}
          type={"text"}
          onChange={(event) => {
            const newInputData = Object.assign({}, props.inputData);
            newInputData.name = event.target.value;
            props.updateIEventDetails(newInputData);
          }}
        />
        <TableInput
          label={"Start: "}
          type={"time"}
          onChange={(event) => {
            const newInputData = Object.assign({}, props.inputData);
            newInputData.start = new Time(event.target.value);
            props.updateIEventDetails(newInputData);
          }}
        />
        <TableInput
          label={"End: "}
          type={"time"}
          onChange={(event) => {
            const newInputData = Object.assign({}, props.inputData);
            newInputData.end = new Time(event.target.value);
            props.updateIEventDetails(newInputData);
          }}
        />
      </tbody>
    </table>
  );
}
