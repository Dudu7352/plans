import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect, Dispatch } from "react";
import "./Sidebar.css";
import CalendarBar from "./calendar_bar/CalendarBar";
import WeekSelector from "./week_selector/WeekSelector";
import { MonthDetails, YearDetails } from "../utils";

interface SidebarProps {
  userYear: number,
  currentYear: number,
  setUserYear: React.Dispatch<React.SetStateAction<number>>,
  setWeek: React.Dispatch<React.SetStateAction<number>>,
}

export default function Sidebar(props: SidebarProps) {
  let [yearDetails, setYearDetails] = useState<YearDetails>({
    year: 0,
    month_details_list: Array<MonthDetails>(12),
    isLeap: false
  });

  useEffect(() => {
    invoke("get_year_details", { year: props.userYear}).then(yearDetailsMsg => {
      setYearDetails(yearDetailsMsg as YearDetails);
    });
  }, [props.userYear]);

  return (
    <div className="Sidebar">
      <CalendarBar 
        year={
          props.currentYear
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
        setWeek={props.setWeek}
      />
    </div>
  );
}
