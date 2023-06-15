import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect } from "react";
import "./Sidebar.css";
import CalendarBar from "./calendar_bar/CalendarBar";
import WeekSelector from "./week_selector/WeekSelector";
import { MonthDetails, YearDetails } from "../utils";

function getYearDetails(year: number): Promise<YearDetails> {
  return invoke("get_year_details", { year: year });
}

export default function Sidebar() {
  let [yearDetails, setYearDetails] = useState<YearDetails>({
    year: 0,
    month_details_list: Array<MonthDetails>(12),
    isLeap: false
  });

  useEffect(() => {
    invoke("get_year_details").then(yearDetailsMsg => {
      setYearDetails(yearDetailsMsg as YearDetails);
    });
  }, []);
  
  console.log("Sidebar", yearDetails);

  return (
    <div className="Sidebar">
      <CalendarBar 
        year={
          yearDetails.year
        }
        setYear={(year: number) => {
          invoke("get_year_details", {year : year}).then(yearDetailsMsg => {
            setYearDetails(yearDetailsMsg as YearDetails);
          });
        }}
      />
      <WeekSelector
        monthDetails={
          yearDetails.month_details_list
        }
        setWeek={() => {}}
      />
    </div>
  );
}
