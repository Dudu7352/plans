import "./Planner.css";

interface PlannerProps {
  week: number,
}

export default function Planner(props: PlannerProps) {
  return (
    <div className="Planner">
      <div className="Editor root-box bordered">
        {props.week}
      </div>
    </div>
  );
}
