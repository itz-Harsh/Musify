
import { useState , useEffect } from 'react';

const Dark = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Check and initialize theme from localStorage
        return localStorage.getItem("theme") === "dark";
      });
    
      useEffect(() => {
        // Apply the theme to the `body` element
        if (darkMode) {
          document.body.classList.add("dark");
          document.body.classList.remove("light");
          localStorage.setItem("theme", "dark");
        } else {
          document.body.classList.add("light");
          document.body.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, [darkMode]);
    
      // Toggle the theme
      const toggleTheme = () => setDarkMode((prev) => !prev);
    
      return (
        <div className="app">
          <header className="flex justify-between items-center p-4">
           
            <button
              className={`toggle ${darkMode ? "dark" : "light"}`}
              onClick={toggleTheme}
            >
              {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </header>
         
        </div>
      );
    };

export default Dark