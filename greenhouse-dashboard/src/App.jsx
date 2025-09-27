import "./App.css";
import Dashboard from "./components/Dashboard";
import { useState, useEffect } from "react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [auto, setAuto] = useState(true); // default auto mode aktif

  useEffect(() => {
    if (auto) {
      const updateThemeByTime = () => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 18) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      };

      updateThemeByTime(); // set awal
      const timer = setInterval(updateThemeByTime, 60 * 1000); // cek tiap menit
      return () => clearInterval(timer);
    }
  }, [auto]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setAuto(false); // user override manual
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen">
      <header className="header">
        <div>
          <h1>🌱 Dashboard Greenhouse</h1>
          <p>Monitoring & Control</p>
        </div>

        {/* Switch elegan */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </header>

      <Dashboard />
    </div>
  );
}
