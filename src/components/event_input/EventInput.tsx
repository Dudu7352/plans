import { Time } from "../../utils/classes";
import { IEventInputData } from "../../utils/interfaces";
import TableInput from "../table_input/TableInput";
import "./EventInput.css";
import ColorPicker from "../color_picker/ColorPicker";

interface EventInputProps {
  templateColors: string[];
  inputData: IEventInputData;
  updateIEventInputData: (inputData: IEventInputData) => void;
}

export default function EventInput(props: EventInputProps) {
  return (
    <div className="EventInput">
      <ColorPicker
        templateColors={props.templateColors}
        setColor={(color: string) => {
          const newInputData: IEventInputData = Object.assign({}, props.inputData);
          newInputData.color = color;
          props.updateIEventInputData(newInputData);
        }}
      />
      <p>Current color: {props.inputData.color}</p>
      <table>
        <tbody>
          <TableInput
            label={"Event name: "}
            type={"text"}
            onChange={(event) => {
              const newInputData: IEventInputData = Object.assign({}, props.inputData);
              newInputData.name = event.target.value;
              props.updateIEventInputData(newInputData);
            }}
          />
          <TableInput
            label={"Start: "}
            type={"time"}
            onChange={(event) => {
              const newInputData: IEventInputData = Object.assign({}, props.inputData);
              newInputData.start = new Time(event.target.value);
              props.updateIEventInputData(newInputData);
            }}
          />
          <TableInput
            label={"End: "}
            type={"time"}
            onChange={(event) => {
              const newInputData: IEventInputData = Object.assign({}, props.inputData);
              newInputData.end = new Time(event.target.value);
              props.updateIEventInputData(newInputData);
            }}
          />
        </tbody>
      </table>
    </div>
  );
}
