import "./PlannerBar.css";

interface PlannerBarProps {
    week: number,
    year: number
}

export default function PlannerBar(props: PlannerBarProps) {
    return (
        <div className="PlannerBar child-box box">
            <h2>
                {/* TODO: display date range of the week from rust function*/}
            </h2>
            <div className="fill"></div>
            <select className="selector">
                <option>Add</option>
            </select>
        </div>
    );
}