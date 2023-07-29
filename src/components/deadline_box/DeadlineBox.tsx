import { Time } from "../../utils/classes";
import "./DeadlineBox.css";
import { IDeadlineDetails } from "../../utils/interfaces";
import { shadeUp } from "../../utils/functions/shades";
import { useState } from "react";

interface DeadlineBoxProps {
  deadlineDetails: IDeadlineDetails;
  showEditEventDialog: () => void;
}

export default function DeadlineBox(props: DeadlineBoxProps) {
  let [highlight, setHightlight] = useState(false);

  const time = Time.fromDate(new Date(props.deadlineDetails.dateTime * 1000));

  return (
    <div
      className="Deadline"
      onMouseEnter={() => setHightlight(true)}
      onMouseLeave={() => setHightlight(false)}
      style={{
        position: "absolute",
        top: `${
          ((time.getHour() * 60 + time.getMinute()) / (24 * 60)) * 100
        }%`,
      }}
      onClick={props.showEditEventDialog}
    >
      <div className="line" style={{
        backgroundColor: highlight ? shadeUp(props.deadlineDetails.color) : props.deadlineDetails.color,
      }}></div>
      <span className="event-name">{props.deadlineDetails.name}</span>
      <p>{time.toString()}</p>
    </div>
  );
}
