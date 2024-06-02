import { ConnectButton } from "arweave-wallet-kit";
import logo from "../assets/logo.svg";
const Navbar = () => {
  return (
    <div className="flex justify-between p-8">
      <div>
        <img src={logo} />
      </div>
      <ConnectButton
        // accent="white"
        profileModal={true}
        showBalance={false}
      >
        Connect Wallet
      </ConnectButton>
    </div>
  );
};

export default Navbar;
