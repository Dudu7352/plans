import { Dispatch, SetStateAction } from "react";
import "./CalendarBar.css";

interface CalendarBarProps {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
}

export default function CalendarBar(props: CalendarBarProps) {
  let years: Array<number> = [];

  if (props.year != 0) {
    for (let i: number = props.year; i < props.year + 5; i++) years.push(i);
  }

  return (
    <div className="CalendarBar child-box">
      <select
        className="year selector"
        onChange={(e) => props.setYear(+e.target.value)}
      >
        {years.map((year, i) => {
          console.log(year, i);
          return (
            <option key={i} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
}
