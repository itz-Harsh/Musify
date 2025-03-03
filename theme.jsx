import { useState, useEffect } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";

const Theme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"; // Default to dark mode
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div  className="theme-toggle flex" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <IoMoon className="theme-icon moon" title="Dark" /> : <IoSunny title="Light" className="theme-icon sun" />}
    </div>
  );
};

export default Theme;
