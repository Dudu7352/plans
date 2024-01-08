import { useState } from "react";
import { Time } from "../../utils/classes";
import { shadeDown, shadeUp } from "../../utils/functions/shades";
import { IEventDetails } from "../../utils/interfaces";
import "./EventBox.css";

interface EventBoxProps {
  eventDetails: IEventDetails;
  showEditEventDialog: () => void;
}

export function EventBox(props: EventBoxProps) {
  let [highlight, setHightlight] = useState(false);

  const start = new Date(props.eventDetails.dateStart * 1000);
  const end = new Date(props.eventDetails.dateEnd * 1000);;
  const duration = (end.getTime() - start.getTime()) / 60000;
  return (
    <div
      className="EventBox bordered rounded"
      onMouseEnter={() => setHightlight(true)}
      onMouseLeave={() => setHightlight(false)}
      style={{
        position: "absolute",
        top: `${
          ((start.getHours() * 60 + start.getMinutes()) / (24 * 60)) * 100
        }%`,
        backgroundColor: highlight ? shadeUp(props.eventDetails.color) : props.eventDetails.color,
        borderColor: highlight ? props.eventDetails.color : shadeDown(props.eventDetails.color),
        height: `${duration / 24}%`,
        transition: 'all 100ms ease-in-out'
      }}
      onClick={props.showEditEventDialog}
    >
      <p className="event-name">{props.eventDetails.eventName}</p>
      {duration == 0 ? (
        <p>{start.toString()}</p>
      ) : (
        <p>
          {`${start.getTime()} - ${end.getTime()}`}
        </p>
      )}
    </div>
  );
}
