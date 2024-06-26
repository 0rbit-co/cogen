import { useState } from "react";
import { createMessage, executeDryrun } from "../utils/getBlog";
import Warning from "./Warning";
import { useTheme } from "../context/ThemeContext";
import { MdContentCopy } from "react-icons/md";

/**
 * BlogGenerator component
 *
 * This component allows users to generate a blog post by providing a topic.
 * It utilizes the `createMessage` and `executeDryrun` functions from the `getBlog` utility
 * to generate the blog content and heading. The generated content is displayed in the UI,
 * and users can copy the heading to the clipboard.
 *
 * The component also supports a dark mode theme, which can be toggled using the `ThemeContext`.
 */

const BlogGenerator = () => {
  // State variables
  const [topic, setTopic] = useState("");
  const [heading, setHeading] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const { isDark } = useTheme();

  /**
   * Handles the generation of the blog content and heading.
   *
   * This function is called when the user clicks the "Generate Blog!" button.
   * It utilizes the `createMessage` and `executeDryrun` functions from the `getBlog` utility
   * to generate the blog content and heading, respectively.
   *
   * If the generation is successful, the generated heading is displayed in the UI.
   * If an error occurs, error messages are displayed or retried up to 5 times with a delay of 2 seconds.
   *
   * @async
   */
  const handleGenerateBlog = async () => {
    setLoading(true);
    try {
      const generatedMsg = await createMessage(topic);
      setMsg(generatedMsg);
      console.log("Generated Message: ", generatedMsg);
      console.log(msg);
      const runWithRetry = async (
        msg: string,
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
      setHeading("Connect your Wallet!");
      setLoading(false);
    }
  };

  /**
   * Handles copying the generated blog heading to the clipboard.
   *
   * This function is called when the user clicks the "Copy" button.
   * It utilizes the `navigator.clipboard.writeText` API to copy the generated heading to the clipboard.
   * If the copy operation is successful, a success message is displayed for 2 seconds.
   * If an error occurs, an error message is displayed.
   */
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(heading)
      .then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        setCopySuccess("Failed to copy!");
      });
  };

  // JSX rendering
  return (
    <div
      className={`flex flex-col items-center justify-center pt-10 ${isDark ? "bg-transparent text-white" : "bg-transparent text-black"
        }`}
    >
      <div
        className={`text-center text-[35px] font-medium font-raleway leading-[44.93px] ${isDark ? "text-[#DCE6C2]" : "text-[#25291C]"
          }`}
      >
        Generate content through your AO Process using{" "}
        <span className="font-jetbrains text-[#EB8F44]">0rbit</span>
      </div>
      <div className="flex items-center gap-8 mt-8">
        <div className="">
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={`w-[705px] h-[52px] rounded-[7px] border-2 px-6 ${isDark
              ? "border-[#485330] text-[#F6FAE3] bg-[#404536] placeholder:text-[#F6FAE3] font-wide"
              : "border-[#82857A] text-[#25291C] bg-[#DADCD4] placeholder:text-[#25291C]"
              }`}
            placeholder="Add Your Topic Here"
            required
          />
        </div>
        <button
          onClick={handleGenerateBlog}
          className={`w-40 py-2 border-2 font-semibold rounded-md focus:outline-none ${isDark
            ? "text-black bg-[#EB8F44] border-transparent hover:bg-[#EB8F44]/50 hover:border-2 hover:border-[#EB8F44]"
            : "text-white bg-[#25291C] border-transparent hover:bg-[#25291C]/90 hover:border-2 hover:border-[#25291C]"
            }`}
        >
          Generate Blog!
        </button>
      </div>
      <button
        onClick={handleCopyToClipboard}
        className={`mt-4 flex items-center gap-2 px-4 py-2 border-2 font-semibold rounded-md focus:outline-none ${isDark
          ? "text-black bg-[#EB8F44] border-transparent hover:bg-[#EB8F44]/50 hover:border-2 hover:border-[#EB8F44]"
          : "text-white bg-[#25291C] border-transparent hover:bg-[#25291C]/90 hover:border-2 hover:border-[#25291C]"
          }`}
      >
        Copy <MdContentCopy />
      </button>
      {copySuccess && (
        <div
          className={`mt-2 text-sm font-medium ${isDark ? "text-[#DCE6C2]" : "text-[#25291C]"
            }`}
        >
          {copySuccess}
        </div>
      )}
      <div className="w-full flex justify-center">
        {loading && (
          <div
            className={`border-2 w-3/4 rounded-lg mt-10 h-80 flex justify-center items-center ${isDark
              ? "bg-[#404536]/20 border-[#485330]"
              : "bg-[#CFD1CA] border-[#82857A]"
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
            className={`border-2 w-3/4 rounded-lg mt-10 py-10 min-h-80 flex justify-center items-center ${isDark
              ? "bg-[#404536]/20 border-[#485330]"
              : "bg-[#DADCD4] border-[#7C8073]"
              }`}
          >
            <div
              className={`flex justify-center px-10 items-center text-xl font-semibold font-['Raleway'] leading-[25px] tracking-wide ${isDark ? "text-[#F6FAE3]" : "text-[#25291C]"
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
