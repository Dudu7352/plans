import "./Planner.css";
import PlannerBar from "./planner_bar/PlannerBar";

interface PlannerProps {
  week: number,
  userYear: number,
}

export default function Planner(props: PlannerProps) {
  return (
    <div className="Planner box">
      <div className="Editor root-box bordered">
        <PlannerBar 
          week={props.week}
          year={props.userYear}
        />
      </div>
    </div>
  );
}
