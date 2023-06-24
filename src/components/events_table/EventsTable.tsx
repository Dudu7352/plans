import { DayDetails } from "../../utils/interfaces";
import EventsTableColumn from "../events_table_column/EventsTableColumn";
import "./EventsTable.css";

interface EventsTableProps {
  weekDetails: DayDetails[]
  emptyCols: number;
}

export default function EventsTable(props: EventsTableProps) {
  return (
      <div className="EventsTable child-box bordered">
        {
          [...Array(props.emptyCols)].map((_, i) => {
            console.log(i);
            return <EventsTableColumn key={i} eventList={[]} />;
          })
        }
        {
          props.weekDetails.map((dayDetails, i) => (
            <EventsTableColumn key={i} eventList={dayDetails.events} />
          ))
        }
      </div>
    );
}
