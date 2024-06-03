import logo from "../assets/logo.svg";
import lightLogo from "../assets/lightLogo.svg";
import { useTheme } from "../context/ThemeContext";

const LogoNavbar = () => {
  const { isDark } = useTheme();

  return (
    <div className="flex justify-between px-8 py-4">
      <div>
        <a href="https://0rbit.co" target="_blank" rel="noopener noreferrer">
          <img src={isDark ? lightLogo : logo} alt="Logo" />
        </a>
      </div>
    </div>
  );
};

export default LogoNavbar;