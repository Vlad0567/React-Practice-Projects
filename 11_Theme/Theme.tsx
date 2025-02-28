import { ThemeProvider } from './ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import "./Theme.css";


const Theme: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app-container">
        <h1>Переключение темы</h1>
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  )
}

export default Theme