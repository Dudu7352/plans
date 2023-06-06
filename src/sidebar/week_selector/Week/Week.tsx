interface DayProps {
  dayNumber: number;
}

function Day(props: DayProps) {
  return <div className="Day">{props.dayNumber%31+1}</div>;
}

interface WeekProps {
  weekId: number;
}

export default function Week(props: WeekProps) {
  return (
    <div className="Column">
        <h3>Jan</h3>
        <div className="Week selector">
        {
          [...Array(7)].map((_, i) => (
            <Day key={props.weekId*7 + i + 1} dayNumber={props.weekId*7 + i}/>
          ))
        }
      </div>
    </div>
  );
}
