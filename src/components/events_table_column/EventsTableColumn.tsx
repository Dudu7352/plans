import { WEEKDAYS } from "../../utils/consts";
import { formatDate } from "../../utils/functions";
import { IDayDetails, Entry } from "../../utils/interfaces";
import Button from "../button/Button";
import DeadlineBox from "../deadline_box/DeadlineBox";
import { EventBox } from "../event_box/EventBox";
import Fill from "../fill/Fill";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import "./EventsTableColumn.css";

interface EventsTableColumnProps {
  dayDetails: IDayDetails;
  showAddEventDialog: () => void;
  showEditEventDialog: (eventType: Entry) => void;
}

export default function EventsTableColumn(props: EventsTableColumnProps) {
  const date = new Date(props.dayDetails.date);
  return (
    <div className="EventsTableColumn rounded">
      <TopBar size={TopBarSize.MEDIUM} float={TopBarFloat.LEFT} rounded>
        <div className="vert">
          <span>{formatDate(date)}</span>
          <span>{WEEKDAYS[date.getDay()]}</span>
        </div>
        <Fill />
        <Button title="Add" onClick={props.showAddEventDialog} fit />
      </TopBar>
      <div className="events child-box rounded bordered">
        {props.dayDetails.events.map((eventType: Entry, i: number) => {
          if (eventType.Event) {
            return (
              <EventBox
                key={i}
                eventDetails={eventType.Event}
                showEditEventDialog={() => {
                  props.showEditEventDialog(eventType);
                }}
              />
            );
          } else if (eventType.Deadline) {
            return (
              <DeadlineBox
              key={i}
                deadlineDetails={eventType.Deadline}
                showEditEventDialog={() => {
                  props.showEditEventDialog(eventType);
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
