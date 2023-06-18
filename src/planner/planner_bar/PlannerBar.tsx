import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
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
            <Button title="Add" onClick={() => {}}/>
            <Select values={["Add"]} onChange={(e) => {}}/>
        </div>
    );
}