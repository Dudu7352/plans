import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import "./PlannerBar.css";

interface PlannerBarProps {
  weekStart: Date,
  weekEnd: Date,
  showEventPropmt: () => void
}

export default function PlannerBar(props: PlannerBarProps) {
  return (
    <div className="PlannerBar child-box box">
      <h2>{props.weekStart.toDateString()} - {props.weekEnd.toDateString()}</h2>
      <div className="fill"></div>
      <Button title="Add" onClick={() => {
        
      }} />
    </div>
  );
}
