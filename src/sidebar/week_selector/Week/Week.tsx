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
  return <td id="Day">{props.dayNumber}</td>;
}

export default function Week(props: WeekProps) {
  return (
    <tr className="Week selector">
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
    </tr>
  );
}
