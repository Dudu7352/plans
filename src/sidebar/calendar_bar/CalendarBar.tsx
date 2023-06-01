import { invoke } from '@tauri-apps/api/tauri';
import React from 'react';
import './CalendarBar.css'

export default function CalendarBar() {
    let years: Array<number> = [];
    let [currentYear, setCurrentYear] = React.useState(0);
    invoke('get_current_year') 
        .then(msg => setCurrentYear(msg as number));
    
    if(currentYear != 0) {
        for(let i: number = currentYear; i<currentYear+5; i++)
            years.push(i);
    }
    
    console.log(years, currentYear);
    
    return (
        <div className="CalendarBar child-box">
            <select className="year selector">
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