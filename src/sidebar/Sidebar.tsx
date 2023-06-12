import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect } from "react";
import "./Sidebar.css";
import CalendarBar from "./calendar_bar/CalendarBar";
import WeekSelector from "./week_selector/WeekSelector";
import { MonthDetails, YearDetails } from "../utils";

function getYearDetails(year: number): YearDetails {
  let result: YearDetails = {
    monthDetailsList: [],
    isLeap: false,
  };
  invoke("get_year_details", { year: year }).then(
    (msg) => (result = msg as YearDetails)
  );
  console.log(result);
  return result;
}

export default function Sidebar() {
  let [yearDetails, setYearDetails] = useState<YearDetails>();
  let [year, setYear] = useState(0);
  let [week, setWeek] = useState(0);

  useEffect(() => {
    invoke("get_current_year").then((year_msg) => {
      const newYear = year_msg as number;
      setYearDetails(getYearDetails(newYear));
      setYear(newYear);
    });
  }, []);
  


  return (
    <div className="Sidebar">
      <CalendarBar year={year} setYear={setYear} />
      <WeekSelector
        monthDetails={
          yearDetails?.monthDetailsList || new Array<MonthDetails>()
        }
        setWeek={setWeek}
      />
    </div>
  );
}
