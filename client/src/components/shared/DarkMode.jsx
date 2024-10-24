import React, { useState } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
export const DarkMode = () => {
    
    const [isDarkMode, setIsDarkMode] = useState(false);

    document.querySelector("html").setAttribute("data-theme", isDarkMode ? 'halloween' : 'light');

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };


    return (
      <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-orange-800 dark:bg-green-800 focus:outline-none focus:ring-2 focus:light-green-500 transition"
    >
      {isDarkMode ? (
        <DarkModeIcon className="h-6 w-6 text-green-700" />
      ) : (
        <LightModeIcon className="h-6 w-6 text-yellow-500" />
      )}
    </button>
    );
};