import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const isDark = useTheme();

  return (
    <div
      className={`w-full flex justify-between py-2 px-20 text-[#EB8F44] ${
        isDark ? "bg-[#373C2B]" : "bg-[#25291C]"
      }`}
    >
      <div>&copy; 2024 0rbit</div>
      <div className="flex items-center gap-6">
        <a href="https://discord.gg/3Sp5RTmYz5" target="_blank" rel="noopener noreferrer">
          <FaDiscord className="text-2xl cursor-pointer" />
        </a>
        <a href="https://x.com/0rbitco" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="text-2xl cursor-pointer" />
        </a>
        <a href="https://github.com/0rbit-co" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-2xl cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
