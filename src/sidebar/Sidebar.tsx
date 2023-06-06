import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import "./Sidebar.css";
import CalendarBar from "./calendar_bar/CalendarBar";
import WeekSelector from "./week_selector/WeekSelector";
import { YearDetails } from "../utils";

function getYearDetails(year: number): YearDetails {
  let result: YearDetails = {
    monthDetailsList: [],
    isLeap: false,
  };
  invoke("get_year_details", { year: year }).then(
    (msg) => (result = msg as YearDetails)
  );
  return result;
}

export default function Sidebar() {
  let [year, setYear] = React.useState(0);
  let [yearDetails, setYearDetails] = React.useState<YearDetails>();
  let [week, setWeek] = React.useState(0);

  invoke("get_current_year").then((year_msg) => {
    const newYear = year_msg as number;
    setYear(newYear);
    //setYearDetails(getYearDetails(newYear));
  });

  return (
    <div className="Sidebar">
      <CalendarBar year={year} setYear={setYear} />
      <WeekSelector />
    </div>
  );
}
