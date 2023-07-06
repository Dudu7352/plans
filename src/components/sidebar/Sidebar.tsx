import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect, Suspense } from "react";
import "./Sidebar.css";
import CalendarBar from "../calendar_bar/CalendarBar";
import WeekSelector from "../week_selector/WeekSelector";
import { MonthDetails, YearDetails } from "../../utils/interfaces";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";

interface SidebarProps {
  userYear: number;
  currentYear: number;
  setUserYear: (year: number) => void;
  setWeek: React.Dispatch<React.SetStateAction<number>>;
}

export default function Sidebar(props: SidebarProps) {
  let [yearDetails, setYearDetails] = useState<YearDetails>({
    year: 0,
    monthDetailsList: Array<MonthDetails>(12),
    isLeap: false,
  });

  useEffect(() => {
    invoke<YearDetails>("get_year_details", { year: props.userYear }).then(
      setYearDetails
    );
  }, [props.userYear]);

  return (
    <div className="Sidebar">
      <Suspense fallback={<div>Loading...</div>}>
        <CalendarBar year={props.currentYear} setYear={props.setUserYear} />
        <WeekSelector
          monthDetails={yearDetails.monthDetailsList}
          setWeek={props.setWeek}
        />
      </Suspense>
    </div>
  );
}
