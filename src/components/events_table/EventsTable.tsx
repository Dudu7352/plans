import { IDayDetails, Entry } from "../../utils/interfaces";
import EventsTableColumn from "../events_table_column/EventsTableColumn";
import Fill from "../fill/Fill";
import "./EventsTable.css";

interface EventsTableProps {
  weekDetails: IDayDetails[];
  emptyCols: number;
  showAddEventDialog: (date: Date) => void;
  showEditEventDialog: (eventType: Entry) => void;
}

export default function EventsTable(props: EventsTableProps) {
  return (
    <div className="EventsTable">
      {[...Array(props.emptyCols)].map((_, i) => {
        return <Fill key={i} />;
      })}
      {props.weekDetails.map((dayDetails, i) => (
        <EventsTableColumn
          key={i}
          dayDetails={dayDetails}
          showAddEventDialog={() => {
            props.showAddEventDialog(dayDetails.date);
          }}
          showEditEventDialog={props.showEditEventDialog}
        />
      ))}
    </div>
  );
}
