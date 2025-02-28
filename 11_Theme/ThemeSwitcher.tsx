import React from "react";
import { useTheme } from "./ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <p>Текущая тема: <strong>{theme === "light" ? "Светлая 🌞" : "Тёмная 🌙"}</strong></p>
      <button onClick={toggleTheme}>
        Переключить тему
      </button>
    </div>
  );
};

export default ThemeSwitcher;
