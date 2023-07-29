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

  const start = new Date(props.eventDetails.dateTime * 1000);
  const startTime = new Time();
  startTime.setHour(start.getHours());
  startTime.setMinute(start.getMinutes());
  const endTime = startTime.copy();
  endTime.addMinutes(Math.floor(props.eventDetails.durationMinutes));
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
        height: `${(props.eventDetails.durationMinutes / (60 * 24)) * 100}%`,
        transition: 'all 100ms ease-in-out'
      }}
      onClick={props.showEditEventDialog}
    >
      <p className="event-name">{props.eventDetails.name}</p>
      {props.eventDetails.durationMinutes == 0 ? (
        <p>{startTime.toString()}</p>
      ) : (
        <p>
          {`${startTime.toString()} - ${endTime.toString()}`}
        </p>
      )}
    </div>
  );
}
