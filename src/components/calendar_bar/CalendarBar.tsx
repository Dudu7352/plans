import Select from "../select/Select";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import "./CalendarBar.css"

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
    <TopBar tauriDrag size={TopBarSize.MEDIUM} float={TopBarFloat.RIGHT} className="CalendarBar">
      <Select
        values={[...Array(5)].map((_, i) => props.year + i)}
        onChange={(e) => props.setYear(+e.target.value)}
      />
    </TopBar>
  );
}
