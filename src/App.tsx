import "./App.css";
import { invoke } from "@tauri-apps/api";
import Sidebar from "./sidebar/Sidebar";
import Planner from "./planner/Planner";
import { useState, useEffect } from "react";

function App() {
  let [currentYear, setCurrentYear] = useState(0);
  let [userYear, setUserYear] = useState(0);
  let [week, setWeek] = useState(0);

  useEffect(() => {
    invoke("get_current_year").then(msg => {
      const currentYear = msg as number;
      setCurrentYear(currentYear);
      setUserYear(currentYear);
    })
  }, []);

  return (
    <div className="App">
      <Sidebar 
        userYear={userYear}
        currentYear={currentYear}
        setUserYear={setUserYear}
        setWeek={setWeek}
      />
      <Planner 
        week={week}
      />
    </div>
  );
}

export default App;
