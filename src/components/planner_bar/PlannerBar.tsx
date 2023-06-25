import Button from "../../components/button/Button";
import { formatDate } from "../../utils/functions";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";
import "./PlannerBar.css";

interface PlannerBarProps {
  weekStart: Date,
  weekEnd: Date,
  showEventPropmt: () => void
}

export default function PlannerBar(props: PlannerBarProps) {
  return (
    <TopBar className="PlannerBar" size={TopBarSize.FIT} float={TopBarFloat.LEFT}>
      <h2>{formatDate(props.weekStart)} - {formatDate(props.weekEnd, true)}</h2>
      <div className="fill"></div>
      <Button title="Add" onClick={props.showEventPropmt} />
    </TopBar>
  );
}
