import Select from "../../components/select/Select";
import "./CalendarBar.css";

interface CalendarBarProps {
  year: number;
  setYear: (year: number) => void;
}

export default function CalendarBar(props: CalendarBarProps) {
  let years: Array<number> = [];

  if (props.year != 0) {
    for (let i: number = props.year; i < props.year + 5; i++) years.push(i);
  }

  return (
    <div className="CalendarBar child-box box">
      <Select
        values={[...Array(5)].map((_, i) => props.year + i)}
        onChange={(e) => props.setYear(+e.target.value)}
      />
    </div>
  );
}
