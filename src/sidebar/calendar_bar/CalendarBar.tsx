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
      <select
        className="year selector"
        onChange={(e) => props.setYear(+e.target.value)}
      >
        {[...Array(5)].map((_, i) => {
          let optionYear: number = props.year + i;
          return (
            <option key={i} value={optionYear}>
              {optionYear}
            </option>
          );
        })}
      </select>
    </div>
  );
}
