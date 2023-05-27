import React from "react";
import './Sidebar.css'
import CalendarBar from "./calendar_bar/CalendarBar";
import WeekSelector from "./week_selector/WeekSelector";

export default function Sidebar() {
    return (
        <div className="Sidebar">
            <CalendarBar />
            <WeekSelector />
        </div>
    );
}