import { formatDate } from "../../utils/functions";
import { DayDetails } from "../../utils/interfaces";
import Button from "../button/Button";
import { EventBox } from "../event_box/EventBox";
import Fill from "../fill/Fill";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import "./EventsTableColumn.css";

interface EventsTableColumnProps {
  dayDetails: DayDetails;
  showEventPropmt: () => void | undefined;
}

export default function EventsTableColumn(props: EventsTableColumnProps) {
  return (
    <div className="EventsTableColumn child-box">
      <TopBar size={TopBarSize.LARGE} float={TopBarFloat.LEFT} rounded>
        <span>{formatDate(new Date(props.dayDetails.date))}</span>

        {props.showEventPropmt ? (
          <>
            <Fill />
            <Button title="Add" onClick={props.showEventPropmt} fit />
          </>
        ) : (
          <></>
        )}
      </TopBar>
      <div className="events">
        {props.dayDetails.events.map((eventDetails, i) => {
          return (
            <EventBox
              key={i}
              date_time={eventDetails.date_time}
              duration_seconds={eventDetails.duration_seconds}
              name={eventDetails.name}
            />
          );
        })}
      </div>
    </div>
  );
}
