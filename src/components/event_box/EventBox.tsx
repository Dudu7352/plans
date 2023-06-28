import { EventDetails } from "../../utils/interfaces";
import "./EventBox.css";

export function EventBox(props: EventDetails) {
  const start = new Date(props.date_time * 1000);
  return (
    <div 
      className="EventBox child-box selectable bordered rounded"
      style={{
        position: "absolute",
        top: `${(start.getHours()*60 + start.getMinutes()) / (24 * 60) * 100}%`,
        height: `${props.duration_seconds / (3600*24) * 100}%`,
      }}
    >
      {props.name}
    </div>
  );
}
