import { invoke } from "@tauri-apps/api";
import "./App.css";
import "./styles";
import Sidebar from "./components/sidebar/Sidebar";
import Planner from "./components/planner/Planner";
import { useState, useEffect } from "react";

export default function App() {
  let [currentYear, setCurrentYear] = useState(0);
  let [userYear, setUserYear] = useState(0);
  let [week, setWeek] = useState(0);
  let [lightTheme, setLightTheme] = useState(true);
  let [templateColors, setTemplateColors] = useState([] as string[]);

  useEffect(() => {
    invoke<number>("get_current_year").then((result) => {
      setCurrentYear(result);
      setUserYear(result);
    });
    invoke<number>("get_current_week").then(setWeek);
    // invoke<string[]>("get_template_colors").then(setTemplateColors);
  }, []);

  return (
    <div className={`App ${lightTheme ? "light" : "dark"}`}>
      <Sidebar
        userYear={userYear}
        currentYear={currentYear}
        setUserYear={(year: number) => setUserYear(year)}
        setWeek={setWeek}
      />
      <Planner
        week={week}
        userYear={userYear}
        templateColors={templateColors}
        toggleTheme={() => {
          setLightTheme((x) => !x);
        }}
      />
    </div>
  );
}
