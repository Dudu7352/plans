import './Day.css'

interface DayProps {
  dayNumber: number;
  nextMonth: number;
}

export default function Day(props: DayProps) {
  return <div className="Day">{(props.dayNumber % props.nextMonth) + 1}</div>;
}
