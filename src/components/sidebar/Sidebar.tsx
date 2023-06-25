import { invoke } from "@tauri-apps/api/tauri";
import { useState, useEffect, Dispatch, Suspense } from "react";
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
    month_details_list: Array<MonthDetails>(12),
    isLeap: false,
  });

  useEffect(() => {
    invoke("get_year_details", { year: props.userYear }).then(
      (yearDetailsMsg) => {
        setYearDetails(yearDetailsMsg as YearDetails);
      }
    );
  }, [props.userYear]);

  return (
    <TopBar className="Sidebar" size={TopBarSize.FIT} float={TopBarFloat.RIGHT}>
      <Suspense fallback={(
        <div>Loading...</div>
      )}>
        <CalendarBar year={props.currentYear} setYear={props.setUserYear} />
        <WeekSelector
          monthDetails={yearDetails.month_details_list}
          setWeek={props.setWeek}
        />
      </Suspense>
    </TopBar>
  );
}
