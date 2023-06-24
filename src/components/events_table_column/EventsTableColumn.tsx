import { EventDetails } from "../../utils/interfaces";

interface DayDetailsProps {
  eventList: EventDetails[];
}

export default function EventsTableColumn(props: DayDetailsProps) {
  return (
    <div className="DayDetails">
      {props.eventList.map((eventDetails, i) => (
        <div key={i} className="EventDetails">
          {eventDetails.name}
        </div>
      ))}
    </div>
  );
}
