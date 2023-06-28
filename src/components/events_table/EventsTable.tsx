import { DayDetails } from "../../utils/interfaces";
import EventsTableColumn from "../events_table_column/EventsTableColumn";
import Fill from "../fill/Fill";
import "./EventsTable.css";

interface EventsTableProps {
  weekDetails: DayDetails[]
  emptyCols: number;
  showEventPrompt: (date: Date) => void;
}

export default function EventsTable(props: EventsTableProps) {
  return (
      <div className="EventsTable child-flat bordered">
        {
          [...Array(props.emptyCols)].map((_, i) => {
            return <Fill key={i} />
          })
        }
        {
          props.weekDetails.map((dayDetails, i) => (
            <EventsTableColumn key={i} dayDetails={dayDetails} showEventPropmt={() => {
              props.showEventPrompt(dayDetails.date);
            }}/>
          ))
        }
      </div>
    );
}
