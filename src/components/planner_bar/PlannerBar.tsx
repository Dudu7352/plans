import { formatDate } from "../../utils/functions";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import "./PlannerBar.css";

interface PlannerBarProps {
  weekStart: Date,
  weekEnd: Date,
  
}

export default function PlannerBar(props: PlannerBarProps) {
  return (
    <TopBar className="PlannerBar" size={TopBarSize.LARGE} float={TopBarFloat.LEFT}>
      <h2>{formatDate(props.weekStart)} - {formatDate(props.weekEnd, true)}</h2>
    </TopBar>
  );
}
