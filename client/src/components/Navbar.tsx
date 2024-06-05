import { ConnectButton } from "arweave-wallet-kit";
import logo from "../assets/logo.svg";
import lightLogo from "../assets/lightLogo.svg";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "../context/ThemeContext";
import ReactGA from "react-ga4";

const Navbar = () => {
  const { isDark } = useTheme();

  const handleLogoClick = () => {
    ReactGA.event({
      category: "Navigation",
      action: "Clicked Logo",
      label: "Logo"
    });
  };

  const handleDocsClick = () => {
    ReactGA.event({
      category: "Navigation",
      action: "Clicked Docs",
      label: "Docs"
    });
  };

  const handleBlogsClick = () => {
    ReactGA.event({
      category: "Navigation",
      action: "Clicked Blogs",
      label: "Blogs"
    });
  };

  const handleConnectWalletClick = () => {
    ReactGA.event({
      category: "Navigation",
      action: "Clicked Connect Wallet",
      label: "Connect Wallet"
    });
  };

  return (
    <div className="flex justify-between px-8 py-4 border-b-[1px] border-[#404536]">
      <div>
        <a
          href="https://0rbit.co"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLogoClick}
        >
          <img src={isDark ? lightLogo : logo} alt="Logo" />
        </a>
      </div>

      <div className="flex justify-center items-center gap-6">
        <ThemeSwitch />
        <a
          href="https://docs.0rbit.co/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDocsClick}
        >
          <div
            className={`rounded-[7px] w-20 flex items-center font-semibold font-lg justify-center ${isDark
                ? "bg-[#DCE6C2] text-[#25291C] py-1"
                : "bg-[#25291C] text-[#E3E5DE] border-black border-[1px]"
              }`}
          >
            Docs
          </div>
        </a>
        <a
          href="https://mirror.xyz/0x26B11B188E9E69b2426FD6111302E721F423020E"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleBlogsClick}
        >
          <div
            className={`rounded-[7px] w-20 flex items-center font-semibold font-lg justify-center ${isDark
                ? "bg-[#DCE6C2] text-[#25291C] py-1"
                : "bg-[#25291C] text-[#E3E5DE] border-black border-[1px]"
              }`}
          >
            Blogs
          </div>
        </a>
        <ConnectButton
          // accent="white"
          profileModal={true}
          showBalance={false}
          onClick={handleConnectWalletClick}
        >
          Connect Wallet
        </ConnectButton>
      </div >
    </div >
  );
};

export default Navbar;