import './Day.css'

interface DayProps {
  dayNumber: number;
}

export default function Day(props: DayProps) {
  return <div className="Day">{(props.dayNumber % 31) + 1}</div>;
}
