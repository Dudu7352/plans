import { formatDate } from "../../utils/functions";
import { DayDetails, EventDetails } from "../../utils/interfaces";
import Button from "../button/Button";
import { EventBox } from "../event_box/EventBox";
import Fill from "../fill/Fill";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import "./EventsTableColumn.css";

interface EventsTableColumnProps {
  dayDetails: DayDetails;
  showAddEventDialog: () => void;
  showEditEventDialog: (eventDetails: EventDetails) => void;
}

export default function EventsTableColumn(props: EventsTableColumnProps) {
  return (
    <div className="EventsTableColumn rounded">
      <TopBar size={TopBarSize.MEDIUM} float={TopBarFloat.LEFT} rounded>
        <span>{formatDate(new Date(props.dayDetails.date))}</span>
        <Fill />
        <Button title="Add" onClick={props.showAddEventDialog} fit />
      </TopBar>
      <div className="events child-box rounded bordered">
        {props.dayDetails.events.map((eventDetails, i) => {
          return (
            <EventBox
              key={i}
              eventDetails={eventDetails}
              showEditEventDialog={() => {
                props.showEditEventDialog(eventDetails);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
