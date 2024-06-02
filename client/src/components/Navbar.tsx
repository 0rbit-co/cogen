import { ConnectButton } from "arweave-wallet-kit";
import logo from "../assets/logo.svg";
const Navbar = () => {
  return (
    <div className="flex justify-between px-8 py-4 border-b-[1px] border-black">
      <div>
        <img src={logo} />
      </div>
      <div className="flex justify-center items-center gap-6">
        <div className="border-[1px] border-black rounded-lg w-20 flex items-center justify-center">Docs</div>
        <div className="border-[1px] border-black rounded-lg w-20 flex items-center justify-center">Blogs</div>
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
