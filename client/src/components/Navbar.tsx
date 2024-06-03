import { ConnectButton } from "arweave-wallet-kit";
import logo from "../assets/logo.svg";
import lightLogo from "../assets/lightLogo.svg";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDark } = useTheme();

  return (
    <div className="flex justify-between px-8 py-4 border-b-[1px] border-black">
      <div>
        <a href="https://0rbit.co" target="_blank" rel="noopener noreferrer">
          <img src={isDark ? lightLogo : logo} alt="Logo" />
        </a>
      </div>

      <div className="flex justify-center items-center gap-6">
        <ThemeSwitch />
        <a href="https://docs.0rbit.co/" target="_blank" rel="noopener noreferrer">
          <div
            className={`rounded-lg w-20 flex items-center font-semibold font-lg justify-center ${
              isDark
                ? "bg-[#E3E5DE] text-[#25291C]"
                : "bg-transparent text-[#25291C] border-black border-[1px] "
            }`}
          >
            Docs
          </div>
        </a>
        <a href="https://mirror.xyz/0x26B11B188E9E69b2426FD6111302E721F423020E" target="_blank" rel="noopener noreferrer">
          <div
            className={`rounded-lg w-20 flex items-center font-semibold font-lg justify-center ${
              isDark
                ? "bg-[#E3E5DE] text-[#25291C]"
                : "bg-transparent text-[#25291C] border-black border-[1px] "
            }`}
          >
            Blogs
          </div>
        </a>
        <ConnectButton
          // accent="white"
          profileModal={true}
          showBalance={false}
        >
          Connect Wallet
        </ConnectButton>
      </div>
    </div>
  );
};

export default Navbar;
