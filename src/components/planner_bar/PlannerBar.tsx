import { formatDate } from "../../utils/functions";
import Button from "../button/Button";
import Fill from "../fill/Fill";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import "./PlannerBar.css";

interface PlannerBarProps {
  weekStart: Date;
  weekEnd: Date;
  toggleTheme: () => void;
}

export default function PlannerBar(props: PlannerBarProps) {
  return (
    <TopBar rounded className="PlannerBar" size={TopBarSize.LARGE} float={TopBarFloat.LEFT}>
      <h2>{formatDate(props.weekStart)} - {formatDate(props.weekEnd, true)}</h2>
      <Fill/>
      <Button title="Theme" onClick={props.toggleTheme} />
    </TopBar>
  );
}
