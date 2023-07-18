import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect, Suspense } from "react";
import "./Sidebar.css";
import CalendarBar from "../calendar_bar/CalendarBar";
import WeekSelector from "../week_selector/WeekSelector";
import { IMonthDetails, IYearDetails } from "../../utils/interfaces";
import TopBar, { TopBarFloat, TopBarSize } from "../top_bar/TopBar";

interface SidebarProps {
  userYear: number;
  currentYear: number;
  setUserYear: (year: number) => void;
  setWeek: React.Dispatch<React.SetStateAction<number>>;
}

export default function Sidebar(props: SidebarProps) {
  let [IYearDetails, setIYearDetails] = useState<IYearDetails>({
    year: 0,
    IMonthDetailsList: Array<IMonthDetails>(12),
    isLeap: false,
  });

  useEffect(() => {
    invoke<IYearDetails>("get_year_details", { year: props.userYear }).then(
      setIYearDetails
    );
  }, [props.userYear]);

  return (
    <TopBar className="Sidebar" size={TopBarSize.FIT} float={TopBarFloat.RIGHT}>
      <Suspense fallback={<div>Loading...</div>}>
        <CalendarBar year={props.currentYear} setYear={props.setUserYear} />
        <WeekSelector
          IMonthDetails={IYearDetails.IMonthDetailsList}
          setWeek={props.setWeek}
        />
      </Suspense>
    </TopBar>
  );
}
