import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect, Suspense } from "react";
import "./Sidebar.css";
import CalendarBar from "../calendar_bar/CalendarBar";
import WeekSelector from "../week_selector/WeekSelector";
import { IMonthDetails, IYearDetails } from "../../utils/interfaces";

interface SidebarProps {
  userYear: number;
  currentYear: number;
  setUserYear: (year: number) => void;
  setWeek: React.Dispatch<React.SetStateAction<number>>;
}

export default function Sidebar(props: SidebarProps) {
  let [yearDetails, setYearDetails] = useState<IYearDetails>({
    year: 0,
    monthDetailsList: Array<IMonthDetails>(12),
    isLeap: false,
  });

  useEffect(() => {
    invoke<IYearDetails>("get_year_details", { year: props.userYear }).then(
      setYearDetails
    );
  }, [props.userYear]);

  return (
    <div className="Sidebar child-box bordered">
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
