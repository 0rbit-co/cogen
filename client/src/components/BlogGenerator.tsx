import { useState } from "react";
import { createMessage, executeDryrun } from "../utils/getBlog";
import Warning from "./Warning";
import { useTheme } from "../context/ThemeContext";

const BlogGenerator = () => {
  const [topic, setTopic] = useState("");
  const [heading, setHeading] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();

  const handleGenerateBlog = async () => {
    setLoading(true);
    try {
      const generatedMsg = await createMessage(topic);
      setMsg(generatedMsg);
      console.log("Generated Message: ", generatedMsg);
      console.log(msg);
      const runWithRetry = async (
        msg: any,
        retryDelay = 2000,
        retryCount = 0
      ) => {
        try {
          const generatedHeading = await executeDryrun(msg);
          if (generatedHeading !== "Error") {
            console.log("Generated Heading: ", generatedHeading);
            setHeading(generatedHeading);
            setLoading(false);
          } else {
            throw new Error("Did not find the expected value, retrying...");
          }
        } catch (error) {
          console.error(
            `Error getting blog (attempt ${retryCount + 1}):`,
            error
          );
          if (retryCount < 5) {
            setTimeout(
              () => runWithRetry(msg, retryDelay, retryCount + 1),
              retryDelay
            );
          } else {
            setHeading("Please Try Again!");
            setLoading(false);
          }
        }
      };

      if (generatedMsg) {
        await runWithRetry(generatedMsg);
      } else {
        console.error("Message is not set. Please send the topic first.");
        setHeading("Please Try Again!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending topic:", error);
      setHeading("Please Try Again!");
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center pt-10 ${
        isDark ? "bg-transparent text-white" : "bg-transparent text-black"
      }`}
    >
      <div
        className={`text-center text-[35px] font-medium font-raleway leading-[44.93px] ${
          isDark ? "text-[#DCE6C2]" : "text-[#25291C]"
        }`}
      >
        Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet
        consectetur
      </div>
      <div className="flex items-center gap-8 mt-8">
        <div className="">
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={`w-[705px] h-[52px] bg-transparent rounded-[7px] border-2 px-6 ${
              isDark
                ? "border-[#485330] text-[#DCE6C2] bg-[#373c2b]"
                : "border-[#82857A] text-[#25291C] bg-[#DADCD4]"
            }`}
            placeholder="Add Your Topic Here"
          />
        </div>
        <button
          onClick={handleGenerateBlog}
          className={`w-40 py-2 border-2 font-semibold rounded-md focus:outline-none ${
            isDark
              ? "text-black bg-[#EB8F44] border-transparent hover:bg-transparent hover:border-2 hover:border-[#EB8F44] hover:text-[#EB8F44]"
              : "text-white bg-[#25291C] border-transparent hover:bg-transparent hover:border-2 hover:border-[#25291C] hover:text-[#25291C]"
          }`}
        >
          Generate Blog!
        </button>
      </div>
      <div className="w-full flex justify-center">
        {loading && (
          <div
            className={`border-2 w-3/4 rounded-lg mt-10 h-80 flex justify-center items-center ${
              isDark
                ? "bg-[#404536]/20 border-[#485330]"
                : "bg-[#DADCD4] border-[#82857A]"
            }`}
          >
            <div className="text-xl font-bold flex">
              <div
                className={`circle ${isDark ? "bg-[#8C957B]" : "bg-[#25291C]"}`}
              ></div>
              <div
                className={`circle ${isDark ? "bg-[#8C957B]" : "bg-[#25291C]"}`}
              ></div>
              <div
                className={`circle ${isDark ? "bg-[#8C957B]" : "bg-[#25291C]"}`}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center">
        {!loading && heading && (
          <div
            className={`border-2 w-3/4 rounded-lg mt-10 py-10 min-h-80 flex justify-center items-center ${
              isDark
                ? "bg-[#404536]/20 border-[#485330]"
                : "bg-gray-200 border-gray-400"
            }`}
          >
            <div
              className={`flex justify-center px-10 items-center text-xl font-semibold font-['Raleway'] leading-[25px] tracking-wide ${
                isDark ? "text-[#F6FAE3]" : "text-[#25291C]"
              }`}
            >
              {heading}
            </div>
          </div>
        )}
      </div>
      <div className="py-8">
        <Warning />
      </div>
    </div>
  );
};

export default BlogGenerator;
