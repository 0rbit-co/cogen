
import { useTheme } from "../context/ThemeContext";

const ThemeSwitch = () => {
  const { isDark, toggleMode } = useTheme();

  return (
    <label className="switch">
      <input type="checkbox" checked={isDark} onChange={toggleMode} />
      <span className="slider round"></span>
    </label>
  );
};

export default ThemeSwitch;