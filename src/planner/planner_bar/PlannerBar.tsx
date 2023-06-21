import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import { formatDate } from "../../utils/functions";
import "./PlannerBar.css";

interface PlannerBarProps {
  weekStart: Date,
  weekEnd: Date,
  showEventPropmt: () => void
}

export default function PlannerBar(props: PlannerBarProps) {
  return (
    <div className="PlannerBar child-box box">
      <h2>{formatDate(props.weekStart)} - {formatDate(props.weekEnd, true)}</h2>
      <div className="fill"></div>
      <Button title="Add" onClick={props.showEventPropmt} />
    </div>
  );
}
