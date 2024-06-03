import React from "react";
import BlogGenerator from "./components/BlogGenerator";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useTheme } from "../src/context/ThemeContext";
import desktop from "./assets/desktop.svg";
import LogoNavbar from "./components/LogoNavbar";

const App: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div>
    <div
      className={`min-h-screen hidden lg:flex flex-col ${isDark ? "bg-[#25291C]" : "bg-[#E3E5DE]"}`}
    >
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <BlogGenerator />
      </div>
      <Footer />
    </div>
    <div className="flex p-8 text-center w-full flex-col gap-8 lg:hidden bg-[E3E5DE] justify-center items-center h-screen">
      <div className="absolute top-0"><LogoNavbar /></div>
      <img src={desktop} alt="desktop" />
      <div className="text-xl">
        <span className="text-[#EB9044]">Blog Generator</span> is supported in Desktop view only
      </div>
    </div>
    </div>
  );
};

export default App;
