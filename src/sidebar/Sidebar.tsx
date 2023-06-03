import { invoke } from '@tauri-apps/api/tauri';
import React from "react";
import './Sidebar.css'
import CalendarBar from "./calendar_bar/CalendarBar";
import WeekSelector from "./week_selector/WeekSelector";

export default function Sidebar() {
    let [year, setYear] = React.useState(0);

    invoke('get_current_year').then(msg => setYear(msg as number));

    return (
        <div className="Sidebar">
            <CalendarBar year={year} setYear={setYear} />
            <WeekSelector year={year}/>
        </div>
    );
}