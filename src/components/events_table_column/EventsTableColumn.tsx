import { WEEKDAYS } from "../../utils/consts";
import { formatDate } from "../../utils/functions";
import { IDayDetails, IEventDetails } from "../../utils/interfaces";
import Button from "../button/Button";
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
          (eventDetails: IEventDetails, i: number) => {
            return (
              <EventBox
                key={i}
                IEventDetails={eventDetails}
                showEditEventDialog={() => {
                  props.showEditEventDialog(eventDetails);
                }}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
