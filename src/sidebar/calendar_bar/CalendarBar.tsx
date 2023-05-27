import { invoke } from "@tauri-apps/api";
import './CalendarBar.css'

export default function CalendarBar() {
    let years: Array<number> = [];
    let currentYear: number = 2023;
    
    for(let i: number = currentYear; i<currentYear+5; i++)
        years.push(i);
    console.log(years, currentYear);
    return (
        <div className="CalendarBar">
            <select className="year">
                {
                    years.map((year, i) => {
                        console.log(year, i);
                        return <option key={i} value={year}>{year}</option>
                    })
                }
            </select>
        </div>
    );
}