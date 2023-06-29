import Button from "../button/Button";

import "./ControlBar.css"

export enum ControlOption {
  ADD = "Add",
  DELETE = "Delete",
  OK = "Ok",
  CANCEL = "Cancel",
  YES = "Yes",
  NO = "No",
}

interface ControlBarProps {
  controlOptionList: ControlOption[];
  onInput: (actionType: ControlOption) => void;
}

export default function ControlBar(props: ControlBarProps) {
  return (
    <div className="ControlBar">
      {props.controlOptionList.map((controlOption, i) => (
        <Button
          key={i}
          title={controlOption}
          onClick={() => {
            props.onInput(controlOption);
          }}
        />
      ))}
    </div>
  );
}
