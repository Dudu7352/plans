import { formatDate } from "../../utils/functions";
import { DayDetails, EventDetails } from "../../utils/interfaces";
import Button from "../button/Button";
import Fill from "../fill/Fill";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import "./EventsTableColumn.css";

interface EventsTableColumnProps {
  dayDetails: DayDetails;
  showEventPropmt: () => void | undefined;
}

export default function EventsTableColumn(props: EventsTableColumnProps) {
  console.log(props);
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
      {props.dayDetails.events.map((eventDetails, i) => (
        <div key={i} className="EventDetails">
          {eventDetails.name}
        </div>
      ))}
    </div>
  );
}
