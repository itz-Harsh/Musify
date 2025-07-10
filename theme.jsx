import { useState, useEffect } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";
import "./src/theme.css";

const Theme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="theme-wrapper">
      <div
        className={`theme-switch ${theme}`}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div className="theme-labels w-screen">
          <span className={`label ${theme === "light" ? "active  pl-[2rem]" : "hidden"}`}>
            DAY
          </span>
          <span className={`label ${theme === "dark" ? "active" : "hidden"}`}>
            NIGHT
          </span>
        </div>
        <div className="slider">
          {theme === "light" ? (
            <IoSunny className="slider-icon" />
          ) : (
            <IoMoon className="slider-icon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Theme;
