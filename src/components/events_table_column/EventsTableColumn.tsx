import { EventDetails } from "../../utils/interfaces";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import "./EventsTableColumn.css";

interface DayDetailsProps {
  eventList: EventDetails[];
}

export default function EventsTableColumn(props: DayDetailsProps) {
  return (
    <div className="EventsTableColumn child-box">
      <TopBar size={TopBarSize.LARGE} float={TopBarFloat.CENTER} rounded={true}>
        
      </TopBar>
      {props.eventList.map((eventDetails, i) => (
        <div key={i} className="EventDetails">
          {eventDetails.name}
        </div>
      ))}
    </div>
  );
}
