import { invoke } from "@tauri-apps/api";
import { DayDetails } from "../../utils/interfaces";
import EventsTableColumn from "../events_table_column/EventsTableColumn";

interface EventsTableProps {
  weekDetails: DayDetails[]
  emptyCols: number;
}

export default function EventsTable(props: EventsTableProps) {
  return (
      <div className="EventsTable child-box bordered">
        {
          Array(props.emptyCols).map((_, i) => (
            <EventsTableColumn eventList={[]} />
          ))
        }
        {
          props.weekDetails.map((dayDetails, i) => (
            <EventsTableColumn key={i} eventList={dayDetails.events} />
          ))
        }
      </div>
    );
}
