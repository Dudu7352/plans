import { IDayDetails, IEventDetails } from "../../utils/interfaces";
import EventsTableColumn from "../events_table_column/EventsTableColumn";
import Fill from "../fill/Fill";
import "./EventsTable.css";

interface EventsTableProps {
  weekDetails: IDayDetails[];
  emptyCols: number;
  showAddEventDialog: (date: Date) => void;
  showEditEventDialog: (IEventDetails: IEventDetails) => void;
}

export default function EventsTable(props: EventsTableProps) {
  return (
    <div className="EventsTable child-flat bordered">
      {[...Array(props.emptyCols)].map((_, i) => {
        return <Fill key={i} />;
      })}
      {props.weekDetails.map((IDayDetails, i) => (
        <EventsTableColumn
          key={i}
          IDayDetails={IDayDetails}
          showAddEventDialog={() => {
            props.showAddEventDialog(IDayDetails.date);
          }}
          showEditEventDialog={props.showEditEventDialog}
        />
      ))}
    </div>
  );
}
