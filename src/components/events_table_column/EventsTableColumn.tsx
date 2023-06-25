import { EventDetails } from "../../utils/interfaces";
import "./EventsTableColumn.css";

interface DayDetailsProps {
  eventList: EventDetails[];
}

export default function EventsTableColumn(props: DayDetailsProps) {
  return (
    <div className="EventsTableColumn child-box">
      {props.eventList.map((eventDetails, i) => (
        <div key={i} className="EventDetails">
          {eventDetails.name}
        </div>
      ))}
    </div>
  );
}
