import { Time } from "../../utils/classes";
import { DeadlineDetails } from "../../utils/interfaces";

interface DeadlineBoxProps {
  deadlineDetails: DeadlineDetails;
  showEditEventDialog: () => void;
}

export default function DeadlineBox(props: DeadlineBoxProps) {
  const time = Time.fromDate(new Date(props.deadlineDetails.dateTime * 1000));

  return (
    <div
      className="Deadline"
      style={{
        position: "absolute",
        top: `${
          ((time.getHour() * 60 + time.getMinute()) / (24 * 60)) * 100
        }%`,
      }}
    >
      <span>{props.deadlineDetails.name}</span>
      <p>{time.toString()}</p>
    </div>
  );
}
