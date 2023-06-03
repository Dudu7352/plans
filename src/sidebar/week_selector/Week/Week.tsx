interface WeekProps {
  weekId: number;
  start: number;
  daysInMonth: number;
  selectedDay: number;
}

interface DayProps {
  dayNumber: number;
  selected: boolean;
}

function Day(props: DayProps) {
  return <div id="Day">{props.dayNumber}</div>;
}

export default function Week(props: WeekProps) {
  return (
    <div className="Week selector">
      {Array(7)
        .fill(null)
        .map(({ _, i }: any) => {
          return (
            <Day
              dayNumber={(props.start + i) % (props.daysInMonth + 1)}
              selected={false}
            />
          );
        })}
    </div>
  );
}
