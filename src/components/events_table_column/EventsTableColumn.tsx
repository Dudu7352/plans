import { WEEKDAYS } from "../../utils/consts";
import { formatDate } from "../../utils/functions";
import { IDayDetails, IEventDetails } from "../../utils/interfaces";
import IEventType from "../../utils/interfaces/IEventType";
import Button from "../button/Button";
import DeadlineBox from "../deadline_box/DeadlineBox";
import { EventBox } from "../event_box/EventBox";
import Fill from "../fill/Fill";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import "./EventsTableColumn.css";

interface EventsTableColumnProps {
  dayDetails: IDayDetails;
  showAddEventDialog: () => void;
  showEditEventDialog: (eventDetails: IEventDetails) => void;
}

export default function EventsTableColumn(props: EventsTableColumnProps) {
  const date = new Date(props.dayDetails.date);
  return (
    <div className="EventsTableColumn child-box">
      <TopBar size={TopBarSize.LARGE} float={TopBarFloat.LEFT} rounded>
        <div className="vert">
          <span>{formatDate(date)}</span>
          <span>{WEEKDAYS[date.getDay()]}</span>
        </div>
        <Fill />
        <Button title="Add" onClick={props.showAddEventDialog} fit />
      </TopBar>
      <div className="events">
        {props.dayDetails.events.map(
          (eventType: IEventType, i: number) => {
            if (eventType.EVENT) {
              const eventDetails = eventType.EVENT;
              return (
                <EventBox
                  key={i}
                  eventDetails={eventDetails}
                  showEditEventDialog={() => {
                    props.showEditEventDialog(eventDetails);
                  }}
                />
              );
            } else if (eventType.DEADLINE) {
              const deadlineDetails = eventType.DEADLINE;
              return (
                <DeadlineBox 
                  deadlineDetails={deadlineDetails} 
                  showEditEventDialog={() => {}}                
                />
              );
            }
          }
        )}
      </div>
    </div>
  );
}
