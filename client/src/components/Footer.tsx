import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-[#25291C] text-[#EB8F44] flex justify-between py-2 px-20">
      <div>&copy; 2024 0rbit</div>
      <div className="flex items-center gap-6">
        <FaDiscord className="text-2xl cursor-pointer"/>
        <FaXTwitter className="text-2xl cursor-pointer"/>
        <FaGithub className="text-2xl cursor-pointer"/>
      </div>
    </div>
  )
}

export default Footer
