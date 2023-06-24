import './Day.css'

interface DayProps {
  monthDay : number;
}

export default function Day(props: DayProps) {
  return (
    <div className="Day">
      {props.monthDay !== -1 ? props.monthDay : ""}
    </div>
  );
}
